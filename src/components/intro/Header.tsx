'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../../styles/intro/Header.module.css';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  typeButton?: 'logout' | 'login' | 'none';
  onButtonClick?: () => void; // callback opcional
}

export default function Header({
  title,
  subtitle,
  typeButton,
  onButtonClick,
}: HeaderProps) {
  const router = useRouter();

  const handleClick = () => {
    if (typeButton === 'logout') {
      Cookies.remove('authToken', { path: '/' });
      router.push('/');
    }
    if (typeButton === 'login') {
      router.push('/login');
    }

    if (onButtonClick) {
      onButtonClick(); // chama callback do pai
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Building2 className={styles.logoIcon} />
            </div>
          </Link>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.texts}>
              <h1 className={styles.headerTitle}>{title}</h1>
              <p className={styles.headerSubtitle}>{subtitle}</p>
            </div>
          </Link>
        </div>

        {typeButton !== 'none' && (
          <button
            className={`${styles.outlineButton} ${
              typeButton === 'logout' ? styles.logoutButton : styles.loginButton
            }`}
            onClick={handleClick}
          >
            {typeButton === 'login' ? 'Entrar' : 'Sair'}
          </button>
        )}
      </div>
    </header>
  );
}

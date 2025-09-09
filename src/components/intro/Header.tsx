'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../../styles/intro/Header.module.css';

interface HeaderProps {
  title: string;
  subtitle: string;
  typeButton: 'logout' | 'login' | 'none';
}

export default function Header({ title, subtitle, typeButton }: HeaderProps) {
  const router = useRouter();

  const handleClick = () => {
    if (typeButton === 'logout') {
      Cookies.remove('authToken', { path: '/' });
      router.push('/');
    }
    if (typeButton === 'login') {
      router.push('/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <Building2 className={styles.logoIcon} />
          </div>
          <div className={styles.texts}>
            <h1 className={styles.headerTitle}>{title}</h1>
            <p className={styles.headerSubtitle}>{subtitle}</p>
          </div>
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

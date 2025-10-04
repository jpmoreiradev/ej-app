'use client';

import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../../styles/intro/Header.module.css';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  typeButton?: 'logout' | 'login' | 'none';
  onButtonClick?: () => void;
}

export default function Header({
  title = 'Oportuniza',
  subtitle = 'Inovando sempre',
  typeButton = 'none',
  onButtonClick,
}: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para animação
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (typeButton === 'logout') {
      Cookies.remove('authToken', { path: '/' });
      router.push('/');
    }
    if (typeButton === 'login') {
      router.push('/login');
    }

    if (onButtonClick) onButtonClick();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Building2 className={styles.logoIcon} />
            </div>
          </Link>

          <div className={styles.texts}>
            <Link href="/" className={styles.titleLink}>
              <h1 className={styles.headerTitle}>
                <strong>{title}</strong>{' '}
              </h1>
            </Link>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
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

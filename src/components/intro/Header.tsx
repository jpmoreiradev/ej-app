'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from '../../styles/intro/Header.module.css';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken'); // remove o token
    window.location.reload(); // recarrega a página
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <Building2 className={styles.logoIcon} />
          </div>
          <div>
            <h1 className={styles.headerTitle}>{title}</h1>
            <p className={styles.headerSubtitle}>{subtitle}</p>
          </div>
        </div>
        <button className={styles.outlineButton} onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}

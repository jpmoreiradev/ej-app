'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/maintenance/Header.module.css';

interface MaintenanceHeaderProps {
  title: string;
  subtitle: string;
}

export default function MaintenanceHeader({
  title,
  subtitle,
}: MaintenanceHeaderProps) {
  const router = useRouter();

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
        <button className={styles.homeButton} onClick={() => router.push('/')}>
          Voltar para Início
        </button>
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import styles from '../../styles/intro/Stats.module.css';
import { Statistics } from '../../types/informative';

interface StatsProps {
  stats: Statistics | null;
  loading: boolean;
}

export default function Stats({ stats, loading }: StatsProps) {
  if (loading) {
    return <div className={styles.statsGrid}>Carregando...</div>;
  }

  if (!stats) {
    return <div className={styles.statsGrid}>Erro ao carregar dados</div>;
  }

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{stats.totalEditals}</div>
        <div className={styles.statLabel}>Editais Ativos</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{stats.participatingAgencies}</div>
        <div className={styles.statLabel}>Órgãos Participantes</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>
          {stats.totalAmount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
        <div className={styles.statLabel}>Valor Total</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>{stats.updated}</div>
        <div className={styles.statLabel}>Atualizações</div>
      </div>
    </div>
  );
}

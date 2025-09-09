'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/intro/Stats.module.css';
import { Statistics } from '../../types/informative';
import { fetchStatistics } from '../../services/editals/informativeServive';

interface StatsProps {
  stats: Statistics | null;
  loading: boolean;
}

export default function Stats() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Erro ao carregar dados');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.statsGrid}>Carregando...</div>;
  }

  if (error || !stats) {
    return (
      <div className={styles.statsGrid}>
        {error || 'Erro ao carregar dados'}
      </div>
    );
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
        <div className={styles.statValue}>{stats.updated}</div>
        <div className={styles.statLabel}>Atualizações</div>
      </div>
    </div>
  );
}

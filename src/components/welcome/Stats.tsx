'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/welcome/Welcome.module.css';
import { Statistics } from '../../types/informative';
import { fetchStatistics } from '../../services/editals/informativeServive';

export default function Stats() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.statsGrid}>Carregando...</div>;
  if (!stats)
    return <div className={styles.statsGrid}>Erro ao carregar dados</div>;

  return (
    <div className={styles.statsCard}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.totalEditals}</div>
          <div className={styles.statLabel}>Editais Ativos</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.participatingAgencies}</div>
          <div className={styles.statLabel}>Órgãos Participantes</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.updated}</div>
          <div className={styles.statLabel}>Atualizações</div>
        </div>
      </div>
    </div>
  );
}

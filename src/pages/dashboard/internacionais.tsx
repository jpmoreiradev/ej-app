import React from 'react';
import { AlertTriangle } from 'lucide-react';

import { useRouter } from 'next/router';
import Header from '../../components/maintenance/Header';
import styles from '../../styles/maintenance/Maintenance.module.css';

const MaintenancePage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Header title="Portal de Editais" subtitle="Governo Federal" />

      <main className={styles.main}>
        <div className={styles.illustration}>
          <AlertTriangle size={100} color="#2563eb" />
        </div>

        <h1 className={styles.title}>Página em Manutenção</h1>
        <p className={styles.message}>
          Estamos trabalhando para melhorar esta página. Em breve tudo estará
          disponível!
        </p>

        <button className={styles.homeButton} onClick={() => router.push('/')}>
          Voltar para Início
        </button>
      </main>
    </div>
  );
};

export default MaintenancePage;

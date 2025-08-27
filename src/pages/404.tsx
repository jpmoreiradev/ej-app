import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '../components/maintenance/Header';
import styles from '../styles/maintenance/NotFound.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Header title="Portal de Editais" subtitle="Governo Federal" />

      <main className={styles.main}>
        <div className={styles.illustration}>
          <AlertTriangle size={100} color="#2563eb" />
        </div>

        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.errorMessage}>
          Ops! A página que você está procurando não existe.
        </p>
        <p className={styles.subMessage}>
          Pode ter sido removida ou o link está incorreto.
        </p>

        <button className={styles.homeButton} onClick={() => router.push('/')}>
          <Home className={styles.icon} /> Voltar para Início
        </button>
      </main>
    </div>
  );
};

export default NotFoundPage;

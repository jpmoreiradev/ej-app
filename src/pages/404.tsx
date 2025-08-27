import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoArea}>
            <Building2 className={styles.logoIcon} />
            <div>
              <h1 className={styles.title}>Portal de Editais</h1>
              <p className={styles.subtitle}>Governo Federal</p>
            </div>
          </div>
          <button
            className={styles.btnOutline}
            onClick={() => router.push('/')}
          >
            Voltar ao Início
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.errorMessage}>Oops! Página não encontrada.</p>
        <button className={styles.homeButton} onClick={() => router.push('/')}>
          <Home className={styles.icon} /> Voltar para Início
        </button>
      </main>
    </div>
  );
};

export default NotFoundPage;

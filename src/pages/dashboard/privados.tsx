import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import styles from '../../styles/maintenance/Maintenance.module.css';

const MaintenancePage = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true); // estado da sidebar

  const toggleSidebar = () => setSidebarOpen((prev) => !prev); // função de toggle

  return (
    <div className={styles.pageWrapper}>
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} />

      <main className={styles.main}>
        <div className={styles.illustration}>
          <AlertTriangle size={100} color="#2563eb" />
        </div>

        <h1 className={styles.title}>Página em Manutenção</h1>
        <p className={styles.message}>
          Estamos trabalhando para Contruir esta página. Em breve tudo estará
          disponível!
        </p>

        <button
          className={styles.homeButton}
          onClick={() => router.push('/dashboard/publicos')}
        >
          <ArrowLeft className={styles.icon} /> Voltar
        </button>
      </main>
    </div>
  );
};

export default MaintenancePage;

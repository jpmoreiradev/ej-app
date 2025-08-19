'use client';
import React from 'react';
import { PanelLeft, Building2 } from 'lucide-react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <header
      className={styles.header}
      style={{
        marginLeft: sidebarOpen ? 256 : 60, // se abre ou fecha
      }}
    >
      <button
        className={styles.menuButton}
        onClick={toggleSidebar}
        style={{
          marginLeft: sidebarOpen ? 0 : -8, // botão se move junto da sidebar
        }}
      >
        <PanelLeft size={16} />
      </button>
      <Building2 size={24} className={styles.logo} />
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>Editais Públicos</h1>
        <p>Concursos e licitações do setor público</p>
      </div>
    </header>
  );
};

export default Header;

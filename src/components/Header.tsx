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
        marginLeft: sidebarOpen ? 220 : 60,
        transition: 'margin-left 0.3s ease',
      }}
    >
      <button onClick={toggleSidebar} className={styles.menuButton}>
        {sidebarOpen ? <PanelLeft size={16} /> : <PanelLeft size={16} />}
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

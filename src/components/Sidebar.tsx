'use client';
import React from 'react';
import {
  Home,
  FileText,
  Settings,
  LogOut,
  Building2,
  Search,
} from 'lucide-react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* Header da sidebar */}
      <div className={styles.headerSidebar}>
        <Building2 className={styles.logo} />
        <div className={styles.titleSidebar}>
          <h1>Portal de Editais</h1>
          <p>Governo Federal</p>
        </div>
      </div>

      {/* Grupo: Navegação */}
      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Navegação</p>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <Home size={18} />
            Início
          </a>
          <a href="#" className={styles.navItem}>
            <Search size={18} />
            Buscar Editais
          </a>
        </nav>
      </div>

      {/* Grupo: Tipos de Editais */}
      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Tipos de Editais</p>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <FileText size={18} />
            Públicos
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={18} />
            Privados
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={18} />
            Internacionais
          </a>
        </nav>
      </div>

      {/* Grupo: Categorias */}
      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Categorias</p>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            Saúde
          </a>
          <a href="#" className={styles.navItem}>
            Educação
          </a>
          <a href="#" className={styles.navItem}>
            Tecnologia
          </a>
        </nav>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <a href="#" className={styles.navItem}>
          <LogOut size={18} />
          Sair
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

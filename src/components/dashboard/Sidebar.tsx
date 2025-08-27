'use client';
import React from 'react';
import {
  Home,
  FileText,
  LogOut,
  Building2,
  Search,
  Heart,
  Trophy,
  BookOpen,
  Globe,
  Lock,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import styles from '../../styles/Sidebar.module.css';

export default function Sidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.closed : ''}`}>
      <div className={styles.headerSidebar}>
        <Building2 className={styles.logo} />
        <div className={styles.titleSidebar}>
          <h1>Portal de Editais</h1>
          <p>Governo Federal</p>
        </div>
      </div>

      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Navegação</p>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navItem}>
            <Home size={18} />
            <span>Início</span>
          </Link>
          <Link href="/buscar" className={styles.navItem}>
            <Search size={18} />
            <span>Buscar Editais</span>
          </Link>
        </nav>
      </div>

      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Tipos de Editais</p>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <FileText size={18} />
            <span>Públicos</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Shield size={18} />
            <span>Privados</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Globe size={18} />
            <span>Internacionais</span>
          </a>
        </nav>
      </div>

      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Categorias</p>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <Heart size={18} />
            <span>Saúde</span>
          </a>
          <a href="#" className={styles.navItem}>
            <BookOpen size={18} />
            <span>Educação</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Trophy size={18} />
            <span>Esporte</span>
          </a>
        </nav>
      </div>

      <div className={styles.footer}>
        <a href="#" className={styles.navItem}>
          <LogOut size={18} />
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}

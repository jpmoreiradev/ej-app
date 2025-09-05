'use client';
import React from 'react';
import {
  Home,
  FileText,
  LogOut,
  Building2,
  Search,
  Globe,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import styles from '../../../styles/dashboard/Sidebar.module.css';
import CategoriasNav from './CategoriasNav';
import { useRouter } from 'next/navigation';

export default function Sidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const router = useRouter();
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
          <Link
            href="/dashboard/publicos"
            className={styles.navItem}
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard/publicos');
              const input = document.getElementById(
                'inputBusca',
              ) as HTMLInputElement;
              input?.focus();
            }}
          >
            <Search size={18} />
            <span>Buscar Editais</span>
          </Link>
        </nav>
      </div>

      <div className={styles.navGroup}>
        <p className={styles.groupTitle}>Tipos de Editais</p>
        <nav className={styles.nav}>
          <Link
            className={styles.navItem}
            href="/dashboard/publicos"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/dashboard/publicos'; // força reload
            }}
          >
            <FileText size={18} />
            <span>Públicos</span>
          </Link>
          <Link href="/dashboard/privados" className={styles.navItem}>
            <Shield size={18} />
            <span>Privados</span>
          </Link>
          <Link href="/dashboard/internacionais" className={styles.navItem}>
            <Globe size={18} />
            <span>Internacionais</span>
          </Link>
        </nav>
      </div>

      <CategoriasNav />

      <div className={styles.footer}>
        <a href="#" className={styles.navItem}>
          <LogOut size={18} />
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import {
  Home,
  FileText,
  LogOut,
  Building2,
  Search,
  Globe,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import styles from '../../../styles/dashboard/Sidebar.module.css';
import CategoriasNav from './CategoriasNav';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({
  sidebarOpen,
  categorias,
}: {
  sidebarOpen: boolean;
  categorias?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    Cookies.remove('authToken', { path: '/' });
    router.push('/login');
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Renderiza AMBAS as versões - CSS decide qual mostrar
  return (
    <>
      {/* Desktop Sidebar */}
        <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.closed : ''}`}>
          <div className={styles.headerSidebar}>
            <Building2 className={styles.logo} />
            <div className={styles.titleSidebar}>
              <h1>Oportuniza</h1>
              <p>Portal de editais</p>
            </div>
          </div>

          <div className={styles.navGroup}>
            <p className={styles.groupTitle}>Navegação</p>
            <nav className={styles.nav}>
              <Link href="/intro" className={styles.navItem}>
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
                <span>Explorar Editais</span>
              </Link>
            </nav>
          </div>

          <div className={styles.navGroup}>
            <p className={styles.groupTitle}>Tipos de Editais</p>
            <nav className={styles.nav}>
              <Link
                className={`${styles.navItem} ${
                  pathname === '/dashboard/publicos' ? styles.active : ''
                }`}
                href="/dashboard/publicos"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/dashboard/publicos';
                }}
              >
                <FileText size={18} />
                <span>Oportunidades Públicas</span>
              </Link>
              <Link
                href="/dashboard/privados"
                className={`${styles.navItem} ${
                  pathname === '/dashboard/privados' ? styles.active : ''
                }`}
              >
                <Shield size={18} />
                <span>Iniciativas Privadas</span>
              </Link>
              <Link
                href="/dashboard/internacionais"
                className={`${styles.navItem} ${
                  pathname === '/dashboard/internacionais' ? styles.active : ''
                }`}
              >
                <Globe size={18} />
                <span>Conexões Globais</span>
              </Link>
            </nav>
          </div>

          <CategoriasNav categoriasProps={categorias} />

          <div className={styles.footer}>
            <button className={styles.logout} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Modal Drawer para Desktop quando sidebar está fechada */}
        <div className={`${styles.mobileSidebarModal} ${drawerOpen ? styles.open : ''}`}>
          <div className={styles.mobileOverlay} onClick={closeDrawer} />
          <div className={styles.mobileDrawer}>
            <div className={styles.mobileDrawerHandle} />

            <div className={styles.mobileDrawerHeader}>
              <Building2 className={styles.logo} />
              <div className={styles.mobileDrawerTitle}>
                <h2>Oportuniza</h2>
                <p>Portal de editais</p>
              </div>
            </div>

            <div className={styles.mobileDrawerContent}>
              <div className={styles.mobileNavGroup}>
                <div className={styles.mobileGroupTitle}>Navegação Rápida</div>
                <div className={styles.mobileNavList}>
                  <Link
                    href="/intro"
                    className={styles.mobileNavListItem}
                    onClick={closeDrawer}
                  >
                    <Home />
                    <span>Início</span>
                  </Link>
                  <Link
                    href="/dashboard/publicos"
                    className={styles.mobileNavListItem}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/dashboard/publicos');
                      closeDrawer();
                      setTimeout(() => {
                        const input = document.getElementById(
                          'inputBusca',
                        ) as HTMLInputElement;
                        input?.focus();
                      }, 300);
                    }}
                  >
                    <Search />
                    <span>Explorar Editais</span>
                  </Link>
                </div>
              </div>

              {categorias && categorias.length > 0 && (
                <div className={styles.mobileNavGroup}>
                  <div className={styles.mobileGroupTitle}>Categorias</div>
                  <div className={styles.mobileNavList}>
                    {categorias.map((categoria, index) => (
                      <Link
                        key={index}
                        href={`/dashboard/publicos?categoria=${encodeURIComponent(categoria)}`}
                        className={styles.mobileNavListItem}
                        onClick={closeDrawer}
                      >
                        <FileText />
                        <span>{categoria}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.mobileNavGroup}>
                <div className={styles.mobileGroupTitle}>Conta</div>
                <div className={styles.mobileNavList}>
                  <button className={styles.mobileLogout} onClick={handleLogout}>
                    <LogOut />
                    <span>Sair da Conta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Mobile Navigation */}
      {/* Bottom Navigation Bar */}
      <nav className={styles.mobileNav}>
        <Link
          href="/intro"
          className={`${styles.mobileNavItem} ${
            pathname === '/intro' ? styles.active : ''
          }`}
        >
          <Home />
          <span>Início</span>
        </Link>

        <Link
          href="/dashboard/publicos"
          className={`${styles.mobileNavItem} ${
            pathname === '/dashboard/publicos' ? styles.active : ''
          }`}
        >
          <FileText />
          <span>Públicos</span>
        </Link>

        <button className={styles.mobileMenuButton} onClick={toggleDrawer}>
          {drawerOpen ? <X /> : <Menu />}
        </button>

        <Link
          href="/dashboard/privados"
          className={`${styles.mobileNavItem} ${
            pathname === '/dashboard/privados' ? styles.active : ''
          }`}
        >
          <Shield />
          <span>Privados</span>
        </Link>

        <Link
          href="/dashboard/internacionais"
          className={`${styles.mobileNavItem} ${
            pathname === '/dashboard/internacionais' ? styles.active : ''
          }`}
        >
          <Globe />
          <span>Globais</span>
        </Link>
      </nav>

      {/* Modal Drawer */}
      <div className={`${styles.mobileSidebarModal} ${drawerOpen ? styles.open : ''}`}>
        <div className={styles.mobileOverlay} onClick={closeDrawer} />
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileDrawerHandle} />

          <div className={styles.mobileDrawerHeader}>
            <Building2 className={styles.logo} />
            <div className={styles.mobileDrawerTitle}>
              <h2>Oportuniza</h2>
              <p>Portal de editais</p>
            </div>
          </div>

          <div className={styles.mobileDrawerContent}>
            <div className={styles.mobileNavGroup}>
              <div className={styles.mobileGroupTitle}>Navegação Rápida</div>
              <div className={styles.mobileNavList}>
                <Link
                  href="/intro"
                  className={styles.mobileNavListItem}
                  onClick={closeDrawer}
                >
                  <Home />
                  <span>Início</span>
                </Link>
                <Link
                  href="/dashboard/publicos"
                  className={styles.mobileNavListItem}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/dashboard/publicos');
                    closeDrawer();
                    setTimeout(() => {
                      const input = document.getElementById(
                        'inputBusca',
                      ) as HTMLInputElement;
                      input?.focus();
                    }, 300);
                  }}
                >
                  <Search />
                  <span>Explorar Editais</span>
                </Link>
              </div>
            </div>

            {categorias && categorias.length > 0 && (
              <div className={styles.mobileNavGroup}>
                <div className={styles.mobileGroupTitle}>Categorias</div>
                <div className={styles.mobileNavList}>
                  {categorias.map((categoria, index) => (
                    <Link
                      key={index}
                      href={`/dashboard/publicos?categoria=${encodeURIComponent(categoria)}`}
                      className={styles.mobileNavListItem}
                      onClick={closeDrawer}
                    >
                      <FileText />
                      <span>{categoria}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mobileNavGroup}>
              <div className={styles.mobileGroupTitle}>Conta</div>
              <div className={styles.mobileNavList}>
                <button className={styles.mobileLogout} onClick={handleLogout}>
                  <LogOut />
                  <span>Sair da Conta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

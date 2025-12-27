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
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Sidebar({
  sidebarOpen,
  categorias,
}: {
  sidebarOpen: boolean;
  categorias?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriaAtual = searchParams.get('categoria');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768,
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
      <aside
        className={`${styles.sidebar} ${!sidebarOpen ? styles.closed : ''}`}
      >
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
                // Limpar filtros disparando evento customizado
                window.dispatchEvent(new CustomEvent('limparFiltros'));
                router.replace('/dashboard/publicos');
                setTimeout(() => {
                  const input = document.getElementById(
                    'inputBusca',
                  ) as HTMLInputElement;
                  input?.focus();
                }, 100);
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
      <div
        className={`${styles.mobileSidebarModal} ${drawerOpen ? styles.open : ''}`}
      >
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
                  href="/dashboard/publicos"
                  className={styles.mobileNavListItem}
                  onClick={(e) => {
                    e.preventDefault();
                    // Limpar filtros disparando evento customizado
                    window.dispatchEvent(new CustomEvent('limparFiltros'));
                    router.replace('/dashboard/publicos');
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

            <div className={styles.mobileNavGroup}>
              <div className={styles.mobileGroupTitle}>
                Categorias Disponíveis
              </div>
              <div className={styles.mobileNavList}>
                <Link
                  href="/dashboard/publicos?categoria=Saúde"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Saúde' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Saúde';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                  <span>Saúde</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Educação"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Educação' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Educação';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </svg>
                  <span>Educação</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Infraestrutura"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Infraestrutura' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Infraestrutura';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                  <span>Infraestrutura</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Esporte-Cultura"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Esporte-Cultura' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Esporte-Cultura';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  <span>Esporte e Cultura</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Meio Ambiente"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Meio Ambiente' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Meio%20Ambiente';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                  <span>Meio Ambiente</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Idosos"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Idosos' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Idosos';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Idosos</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=não foi possível"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'não foi possível' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=n%C3%A3o%20foi%20poss%C3%ADvel';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                  <span>Outros</span>
                </Link>
              </div>
            </div>

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
      <div
        className={`${styles.mobileSidebarModal} ${drawerOpen ? styles.open : ''}`}
      >
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
                  href="/dashboard/publicos"
                  className={styles.mobileNavListItem}
                  onClick={(e) => {
                    e.preventDefault();
                    // Limpar filtros disparando evento customizado
                    window.dispatchEvent(new CustomEvent('limparFiltros'));
                    router.replace('/dashboard/publicos');
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

            <div className={styles.mobileNavGroup}>
              <div className={styles.mobileGroupTitle}>
                Categorias Disponíveis
              </div>
              <div className={styles.mobileNavList}>
                <Link
                  href="/dashboard/publicos?categoria=Saúde"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Saúde' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Saúde';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                  <span>Saúde</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Educação"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Educação' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Educação';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </svg>
                  <span>Educação</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Infraestrutura"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Infraestrutura' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Infraestrutura';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                  <span>Infraestrutura</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Esporte-Cultura"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Esporte-Cultura' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Esporte-Cultura';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  <span>Esporte e Cultura</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Meio Ambiente"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Meio Ambiente' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Meio%20Ambiente';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                  <span>Meio Ambiente</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=Idosos"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'Idosos' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=Idosos';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Idosos</span>
                </Link>
                <Link
                  href="/dashboard/publicos?categoria=não foi possível"
                  className={`${styles.mobileNavListItem} ${categoriaAtual === 'não foi possível' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                    window.location.href =
                      '/dashboard/publicos?categoria=n%C3%A3o%20foi%20poss%C3%ADvel';
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                  <span>Outros</span>
                </Link>
              </div>
            </div>

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

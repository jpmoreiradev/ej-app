'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/admin/Dashboard.module.css';
import { Shield, LogOut, FileText, MapPin, Settings } from 'lucide-react';
import { fetchStatistics } from '../../services/editals/informativeService';
import { getAllMunicipalities } from '../../services/admin/municipalities';

interface AdminData {
  admin_id: string;
  nome: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [totalMunicipios, setTotalMunicipios] = useState(0);
  const [totalEditais, setTotalEditais] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se o admin está autenticado
    const token = localStorage.getItem('adminToken');
    const data = localStorage.getItem('adminData');

    if (!token || !data) {
      router.push('/admin/login');
      return;
    }

    setAdminData(JSON.parse(data));
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Buscar total de municípios
      const municipios = await getAllMunicipalities();
      setTotalMunicipios(municipios.length);

      // Buscar estatísticas de editais
      const stats = await fetchStatistics();
      setTotalEditais(stats.totalEditals || 0);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  if (!adminData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Shield size={32} />
          </div>
          <h2 className={styles.logoText}>Admin Panel</h2>
        </div>

        <nav className={styles.nav}>
          <a href="/admin/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <FileText size={20} />
            <span>Dashboard</span>
          </a>
          <a href="/admin/municipios" className={styles.navItem}>
            <MapPin size={20} />
            <span>Municípios</span>
          </a>
          <a href="#" className={styles.navItem}>
            <FileText size={20} />
            <span>Editais</span>
          </a>
          <a href="/admin/configuracoes" className={styles.navItem}>
            <Settings size={20} />
            <span>Configurações</span>
          </a>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Painel Administrativo</h1>
            <p className={styles.pageSubtitle}>Bem-vindo ao sistema de administração</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>
                {adminData.nome.charAt(0).toUpperCase()}
              </div>
              <div className={styles.adminDetails}>
                <p className={styles.adminName}>{adminData.nome}</p>
                <p className={styles.adminRole}>{adminData.role}</p>
              </div>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.welcomeCard}>
            <h2>Bem-vindo, {adminData.nome}!</h2>
            <p>Este é o painel de administração do Oportuniza.</p>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>
              Em breve, você terá acesso a recursos de gerenciamento completo.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#ede9fe' }}>
                <MapPin size={24} style={{ color: '#7c3aed' }} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>
                  {loading ? '...' : totalMunicipios}
                </h3>
                <p className={styles.statLabel}>Municípios</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#dcfce7' }}>
                <FileText size={24} style={{ color: '#16a34a' }} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>
                  {loading ? '...' : totalEditais}
                </h3>
                <p className={styles.statLabel}>Editais</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

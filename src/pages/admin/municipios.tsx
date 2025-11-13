'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/admin/Municipios.module.css';
import dashboardStyles from '../../styles/admin/Dashboard.module.css';
import {
  Shield,
  LogOut,
  MapPin,
  FileText,
  Settings,
  Search,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  getAllMunicipalities,
  searchMunicipalityByName,
  createMunicipality,
  deleteMunicipality,
  Municipality,
  CreateMunicipalityData,
} from '../../services/admin/municipalities';

interface AdminData {
  admin_id: string;
  nome: string;
  email: string;
  role: string;
}

const MunicipiosAdmin = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateMunicipalityData>({
    cidade: '',
    estado: '',
    pais: 'Brasil',
    codigoIbge: 0,
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const data = localStorage.getItem('adminData');

    if (!token || !data) {
      router.push('/admin/login');
      return;
    }

    setAdminData(JSON.parse(data));
    loadMunicipalities();
  }, [router]);

  const loadMunicipalities = async () => {
    try {
      setLoading(true);
      const data = await getAllMunicipalities();
      setMunicipalities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadMunicipalities();
      return;
    }

    try {
      setLoading(true);
      const result = await searchMunicipalityByName(searchTerm);
      setMunicipalities([result]);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setMunicipalities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMunicipality(formData);
      setShowCreateModal(false);
      setFormData({ cidade: '', estado: '', pais: 'Brasil', codigoIbge: 0 });
      loadMunicipalities();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, cidade: string) => {
    if (!confirm(`Tem certeza que deseja deletar ${cidade}?`)) {
      return;
    }

    try {
      await deleteMunicipality(id);
      loadMunicipalities();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    document.cookie =
      'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  if (!adminData) {
    return (
      <div className={dashboardStyles.container}>
        <div className={dashboardStyles.loading}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className={dashboardStyles.container}>
      <aside className={dashboardStyles.sidebar}>
        <div className={dashboardStyles.sidebarHeader}>
          <div className={dashboardStyles.logo}>
            <Shield size={32} />
          </div>
          <h2 className={dashboardStyles.logoText}>Admin Panel</h2>
        </div>

        <nav className={dashboardStyles.nav}>
          <a href="/admin/dashboard" className={dashboardStyles.navItem}>
            <FileText size={20} />
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/municipios"
            className={`${dashboardStyles.navItem} ${dashboardStyles.active}`}
          >
            <MapPin size={20} />
            <span>Municípios</span>
          </a>
          <a href="#" className={dashboardStyles.navItem}>
            <FileText size={20} />
            <span>Editais</span>
          </a>
          <a href="#" className={dashboardStyles.navItem}>
            <Settings size={20} />
            <span>Configurações</span>
          </a>
        </nav>
      </aside>

      <main className={dashboardStyles.main}>
        <header className={dashboardStyles.header}>
          <div className={dashboardStyles.headerContent}>
            <h1 className={dashboardStyles.pageTitle}>Gerenciar Municípios</h1>
            <p className={dashboardStyles.pageSubtitle}>
              Gerencie os municípios cadastrados no sistema
            </p>
          </div>
          <div className={dashboardStyles.headerActions}>
            <div className={dashboardStyles.adminInfo}>
              <div className={dashboardStyles.adminAvatar}>
                {adminData.nome.charAt(0).toUpperCase()}
              </div>
              <div className={dashboardStyles.adminDetails}>
                <p className={dashboardStyles.adminName}>{adminData.nome}</p>
                <p className={dashboardStyles.adminRole}>{adminData.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={dashboardStyles.logoutButton}
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <div className={dashboardStyles.content}>
          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.toolbar}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Buscar município por cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className={styles.searchInput}
              />
              <button onClick={handleSearch} className={styles.searchButton}>
                <Search size={20} />
                <span>Buscar</span>
              </button>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    loadMunicipalities();
                  }}
                  className={styles.clearButton}
                >
                  Limpar
                </button>
              )}
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className={styles.createButton}
            >
              <Plus size={20} />
              <span>Novo Município</span>
            </button>
          </div>

          {loading ? (
            <div className={styles.loadingState}>Carregando municípios...</div>
          ) : municipalities.length === 0 ? (
            <div className={styles.emptyState}>
              <MapPin size={48} />
              <p>Nenhum município encontrado</p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>País</th>
                    <th>Código IBGE</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {municipalities.map((municipality) => (
                    <tr key={municipality._id}>
                      <td className={styles.municipalityName}>
                        <MapPin size={18} />
                        {municipality.cidade}
                      </td>
                      <td>{municipality.estado}</td>
                      <td>{municipality.pais}</td>
                      <td>{municipality.codigoIbge}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDelete(municipality._id, municipality.cidade)
                          }
                          className={styles.deleteButton}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Novo Município</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={(e) =>
                    setFormData({ ...formData, cidade: e.target.value })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: Juazeiro"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="estado">Estado</label>
                <input
                  id="estado"
                  type="text"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estado: e.target.value,
                    })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: Bahia"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="pais">País</label>
                <input
                  id="pais"
                  type="text"
                  value={formData.pais}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pais: e.target.value,
                    })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: Brasil"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="codigoIbge">Código IBGE</label>
                <input
                  id="codigoIbge"
                  type="number"
                  value={formData.codigoIbge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      codigoIbge: Number(e.target.value),
                    })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: 2918407"
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Criar Município
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipiosAdmin;

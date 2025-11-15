'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/admin/Configuracoes.module.css';
import dashboardStyles from '../../styles/admin/Dashboard.module.css';
import {
  Shield,
  LogOut,
  MapPin,
  FileText,
  Settings,
  Plus,
  Trash2,
  X,
  UserPlus,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import {
  getAllAdmins,
  createAdmin,
  deleteAdmin,
  activateAdmin,
  deactivateAdmin,
  Admin,
  CreateAdminData,
} from '../../services/admin/admins';

interface AdminData {
  admin_id: string;
  nome: string;
  email: string;
  role: string;
}

const ConfiguracoesAdmin = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateAdminData>({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
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
    loadAdmins();
  }, [router]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin(formData);
      setShowCreateModal(false);
      setFormData({ nome: '', email: '', senha: '', telefone: '' });
      loadAdmins();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleStatus = async (admin: Admin) => {
    try {
      if (admin.ativo) {
        await deactivateAdmin(admin._id);
      } else {
        await activateAdmin(admin._id);
      }
      loadAdmins();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja deletar o administrador ${nome}?`)) {
      return;
    }

    try {
      await deleteAdmin(id);
      loadAdmins();
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
          <Link href="/admin/dashboard" className={dashboardStyles.navItem}>
            <FileText size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/municipios" className={dashboardStyles.navItem}>
            <MapPin size={20} />
            <span>Municípios</span>
          </Link>
          <Link href="#" className={dashboardStyles.navItem}>
            <FileText size={20} />
            <span>Editais</span>
          </Link>
          <Link
            href="/admin/configuracoes"
            className={`${dashboardStyles.navItem} ${dashboardStyles.active}`}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </nav>
      </aside>

      <main className={dashboardStyles.main}>
        <header className={dashboardStyles.header}>
          <div className={dashboardStyles.headerContent}>
            <h1 className={dashboardStyles.pageTitle}>Configurações</h1>
            <p className={dashboardStyles.pageSubtitle}>
              Gerencie administradores do sistema
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

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Administradores</h2>
                <p className={styles.sectionSubtitle}>
                  Gerencie os administradores do sistema
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className={styles.createButton}
              >
                <UserPlus size={20} />
                <span>Novo Admin</span>
              </button>
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                Carregando administradores...
              </div>
            ) : admins.length === 0 ? (
              <div className={styles.emptyState}>
                <UserPlus size={48} />
                <p>Nenhum administrador encontrado</p>
              </div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin._id}>
                        <td className={styles.adminName}>
                          <Shield size={18} />
                          {admin.nome}
                        </td>
                        <td>{admin.email}</td>
                        <td>{admin.telefone || '-'}</td>
                        <td>
                          <span className={styles.roleBadge}>
                            {admin.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${styles.statusBadge} ${
                              admin.ativo ? styles.active : styles.inactive
                            }`}
                          >
                            {admin.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              onClick={() => handleToggleStatus(admin)}
                              className={styles.toggleButton}
                              title={
                                admin.ativo ? 'Desativar' : 'Ativar'
                              }
                            >
                              {admin.ativo ? (
                                <ToggleRight size={18} />
                              ) : (
                                <ToggleLeft size={18} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(admin._id, admin.nome)
                              }
                              className={styles.deleteButton}
                              title="Deletar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Novo Administrador</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome Completo</label>
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: João Silva"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className={styles.input}
                  placeholder="Ex: joao@admin.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  required
                  className={styles.input}
                  placeholder="Senha forte"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone (Opcional)</label>
                <input
                  id="telefone"
                  type="text"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  className={styles.input}
                  placeholder="Ex: 11999999999"
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
                  Criar Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracoesAdmin;

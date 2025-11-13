'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/login/Login.module.css';
import { Shield, Lock, Mail } from 'lucide-react';
import { adminLoginRequest } from '../../services/admin/auth';
import Link from 'next/link';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminLoginRequest(email, senha);

      if (data.authToken) {
        // Salvar token e informações do admin
        localStorage.setItem('adminToken', data.authToken);
        localStorage.setItem('adminData', JSON.stringify({
          admin_id: data.admin_id,
          nome: data.nome,
          email: data.email,
          role: data.role
        }));
        document.cookie = `adminToken=${data.authToken}; path=/; samesite=lax`;
      }
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logo} style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' }}>
            <Shield size={32} />
          </div>
          <h1 className={styles.title}>Administração</h1>
          <p className={styles.subtitle}>Acesso restrito para administradores</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Login Admin</h2>
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.icon} size={16} />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@oportuniza.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="senha" className={styles.label}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={16} />
                <input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
              style={{ background: loading ? '#999' : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' }}
            >
              {loading ? 'Entrando...' : 'Entrar como Admin'}
            </button>
          </form>

          <p className={styles.forgotWrapper}>
            <Link href="/intro" className={styles.forgot}>
              Voltar para página inicial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

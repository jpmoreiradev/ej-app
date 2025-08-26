'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Login.module.css';
import { Building2, Lock, Mail } from 'lucide-react';
import { loginRequest } from '../services/auth/login';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginRequest(email, password);

      if (data.authToken) {
        document.cookie = `authToken=${data.authToken}; path=/; secure; samesite=strict`;
      }
      router.push('/');
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
          <div className={styles.logo}>
            <Building2 size={32} />
          </div>
          <h1 className={styles.title}>Portal de Editais</h1>
          <p className={styles.subtitle}>Acesse sua conta para continuar</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Entrar</h2>
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
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={16} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>
            )}

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className={styles.forgotWrapper}>
            <Link href="/esqueceu-senha" className={styles.forgot}>
              Esqueceu sua senha?
            </Link>
          </p>
        </div>

        <p className={styles.footer}>
          Portal Oficial do Governo • Dados Protegidos
        </p>
      </div>
    </div>
  );
};

export default Login;

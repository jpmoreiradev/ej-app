'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se já está logado
    const token = localStorage.getItem('adminToken');

    if (token) {
      // Se já tem token, vai para o dashboard
      router.push('/admin/dashboard');
    } else {
      // Se não tem token, vai para o login
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: '1.2rem',
      color: '#64748b'
    }}>
      Redirecionando...
    </div>
  );
}

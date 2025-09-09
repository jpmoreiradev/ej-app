'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Intro from '../components/intro/Intro';
import { validateToken } from '../services/auth/authProfile';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        Cookies.remove('authToken');
        router.push('/login');
        return;
      }
      setLoading(false);
    };

    checkToken();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader"></div>
        <p>Validando sessão...</p>
      </div>
    );
  }

  return <Intro />;
}

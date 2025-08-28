'use client';

import React, { useEffect, useState } from 'react';
import { Heart, BookOpen, Trophy } from 'lucide-react';
import styles from '../../styles/dashboard/Sidebar.module.css';
import { getCategorias } from '../../services/editals/informativeServive';

interface Categoria {
  label: string;
  value: string;
}

export default function CategoriasNav() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      } finally {
        setLoading(false);
      }
    };

    carregarCategorias();
  }, []);

  const handleCategoriaClick = (cat: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('categoria', cat);
    window.location.href = url.toString(); // força reload
  };

  return (
    <div className={styles.navGroup}>
      <p className={styles.groupTitle}>Categorias</p>
      <nav className={styles.nav}>
        {loading && <p>Carregando...</p>}
        {!loading &&
          categorias.slice(0, 5).map((cat) => (
            <a
              key={cat.value}
              onClick={() => handleCategoriaClick(cat.value)}
              className={styles.navItem}
            >
              {getIcon(cat.value)}
              <span>{cat.label}</span>
            </a>
          ))}
      </nav>
    </div>
  );
}

function getIcon(categoria: string) {
  switch (categoria.toLowerCase()) {
    case 'saude':
      return <Heart size={18} />;
    case 'educacao':
      return <BookOpen size={18} />;
    case 'esporte':
      return <Trophy size={18} />;
    default:
      return <Heart size={18} />; // ícone padrão
  }
}

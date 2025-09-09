'use client';

import React from 'react';
import { Heart, BookOpen, Trophy, Layers, Box } from 'lucide-react';
import styles from '../../../styles/dashboard/Sidebar.module.css';
import { categoriasDisponiveis } from '../../../config/categorias';
import { useSearchParams } from 'next/navigation';

interface Categoria {
  label: string;
  value: string;
}

interface CategoriasNavProps {
  categoriasProps?: string[]; // Lista de categorias ativas vindas de props
}

export default function CategoriasNav({ categoriasProps }: CategoriasNavProps) {
  const searchParams = useSearchParams();
  const categoriaAtual = searchParams.get('categoria');

  return (
    <div className={styles.navGroup}>
      <p className={styles.groupTitle}>Categorias</p>
      <nav className={styles.nav}>
        {categoriasDisponiveis.map((cat) => {
          const categoriaAtiva =
            categoriaAtual === cat.value ||
            categoriasProps?.includes(cat.value);

          return (
            <a
              key={cat.value}
              href={`?categoria=${cat.value}`}
              className={`${styles.navItem} ${categoriaAtiva ? styles.active : ''}`}
            >
              {getIcon(cat.value)}
              <span>{cat.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// Ícones seguros
function getIcon(categoria?: string) {
  if (!categoria) return <Heart size={18} />;

  const iconsMap: Record<string, JSX.Element> = {
    saude: <Heart size={18} />,
    educacao: <BookOpen size={18} />,
    esportes: <Trophy size={18} />,
    infraestrutura: <Layers size={18} />,
    'não foi possível': <Box size={18} />,
  };

  return iconsMap[categoria.toLowerCase()] || <Heart size={18} />;
}

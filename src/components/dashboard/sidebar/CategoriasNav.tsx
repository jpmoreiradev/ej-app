'use client';

import React from 'react';
import {
  Heart,
  BookOpen,
  Trophy,
  Layers,
  Grid,
  Box,
  Compass,
  Shuffle,
  CurlyBraces,
  Archive,
  Aperture,
} from 'lucide-react';
import styles from '../../../styles/dashboard/Sidebar.module.css';

interface Categoria {
  label: string;
  value: string;
}

export default function CategoriasNav() {
  const categorias: Categoria[] = [
    { label: 'Saúde', value: 'saude' },
    { label: 'Educação', value: 'educacao' },
    { label: 'Esportes', value: 'esportes' },
    { label: 'Infraestrutura', value: 'infraestrutura' },
    { label: 'Outros', value: 'não foi possível' },
  ];

  return (
    <div className={styles.navGroup}>
      <p className={styles.groupTitle}>Categorias</p>
      <nav className={styles.nav}>
        {categorias.map((cat) => (
          <a
            key={cat.value}
            href={`?categoria=${cat.value}`}
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
  const iconsMap: Record<string, JSX.Element> = {
    saude: <Heart size={18} />,
    educacao: <BookOpen size={18} />,
    esportes: <Trophy size={18} />,
    infraestrutura: <Layers size={18} />,
    'não foi possível': <Box size={18} />,
  };

  return iconsMap[categoria.toLowerCase()] || <Heart size={18} />;
}

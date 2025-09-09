'use client';

import React from 'react';
import { Heart, BookOpen, Trophy, Layers, Box } from 'lucide-react';
import styles from '../../../styles/dashboard/Sidebar.module.css';
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

  // Lista padrão de categorias
  const categorias: Categoria[] = [
    { label: 'Saúde', value: 'saude' },
    { label: 'Educação', value: 'educacao' },
    { label: 'Esportes', value: 'esportes' },
    { label: 'Infraestrutura', value: 'infraestrutura' },
    { label: 'Tecnologia', value: 'tecnologia' },
    { label: 'Outros', value: 'nao_foi_possivel' }, // sem acentos para map
  ];

  return (
    <div className={styles.navGroup}>
      <p className={styles.groupTitle}>Categorias</p>
      <nav className={styles.nav}>
        {categorias.map((cat) => {
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
    nao_foi_possivel: <Box size={18} />,
  };

  return iconsMap[categoria.toLowerCase()] || <Heart size={18} />;
}

'use client';

import React, { useEffect, useState } from 'react';
import { fetchEditais } from '../../services/editals/informativeService';
import { Notice } from '../../types/informative';
import styles from '../../styles/intro/FeaturedEditais.module.css';
import { useRouter } from 'next/navigation';
import SkeletonCard from '../skeleton/SkeletonCard';

export default function FeaturedEditais() {
  const [editais, setEditais] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getEditais = async () => {
      try {
        const data = await fetchEditais({
          page: 0,
          size: 3,
          fgInteresse: false,
        });
        setEditais(data.content);
      } catch (err) {
        setError('Não foi possível carregar os editais em destaque.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEditais();
  }, []);

  const handleEditalClick = (id: string) => {
    router.push(`/editais/${id}`);
  };

  return (
    <div className={styles.featuredSection}>
      <h2 className={styles.sectionTitle}>Editais em Destaque</h2>
      <p className={styles.sectionSubtitle}>
        Confira algumas das oportunidades mais recentes e relevantes.
      </p>
      {loading && (
        <div className={styles.editaisGrid}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <div className={styles.editaisGrid}>
          {editais.map((edital) => (
            <div
              key={edital.id}
              className={styles.editalCard}
              onClick={() => handleEditalClick(edital.id)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.orgao}>{edital.orgaoResponsavel}</span>
              </div>
              <h3 className={styles.editalTitle}>{edital.titulo}</h3>
              <p className={styles.editalInfo}>
                <strong>Inscrições até:</strong> {edital.dataEncerramento}
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>{edital.categoria}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

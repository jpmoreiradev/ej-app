'use client';
import React, { useEffect, useState } from 'react';
import EditalCard from '../../components/Card';
import { fetchEditais } from '../../services/informativeServive';
import { Notice } from '../../types/informative';
import styles from '../../styles/Dashboard.module.css';

const EditaisPage = () => {
  const [editais, setEditais] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditais(0, 6)
      .then((data) => setEditais(data.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando editais...</p>;

  return (
    <div className={styles.container}>
      {editais.map((edital) => (
        <EditalCard
          key={edital.id}
          id={edital.id.toString()}
          title={edital.titulo}
          orgao={edital.orgaoResponsavel}
          valor="R$ 0,00" // adapte conforme a API
          dataFinal={edital.dataPublicacao}
          categoria="saude" // adapte conforme a API
          status="aberto" // adapte conforme a API
          cidade="Cidade X" // adapte conforme a API
        />
      ))}
    </div>
  );
};

export default EditaisPage;

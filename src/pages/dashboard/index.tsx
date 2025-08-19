'use client';
import React, { useEffect, useState } from 'react';
import EditalCard from '../../components/Card';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { fetchEditais } from '../../services/informativeServive';
import { Notice } from '../../types/informative';
import styles from '../../styles/Dashboard.module.css';

const EditaisPage = () => {
  const [editais, setEditais] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchEditais(0, 6)
      .then((data) => setEditais(data.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando editais...</p>;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={styles.page}>
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={styles.layout}>
        {/* Sidebar */}
        <div
          className={`${styles.sidebar} ${!sidebarOpen ? styles.closed : ''}`}
        >
          <Sidebar />
        </div>

        {/* Conteúdo principal */}
        <main
          className={styles.container}
          style={{
            marginLeft: sidebarOpen ? 220 : 60,
            transition: 'margin-left 0.3s ease',
          }}
        >
          {editais.map((edital) => (
            <EditalCard
              key={edital.id}
              id={edital.id.toString()}
              title={edital.titulo}
              orgao={edital.orgaoResponsavel}
              valor="R$ 0,00"
              dataFinal={edital.dataPublicacao}
              categoria="saude"
              status="aberto"
              cidade="Cidade X"
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default EditaisPage;

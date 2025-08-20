'use client';
import React, { useEffect, useState } from 'react';
import EditalCard from '../../components/Card';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { fetchEditais } from '../../services/informativeServive';
import { Notice, NoticePage } from '../../types/informative';
import styles from '../../styles/Dashboard.module.css';

const EditaisPage = () => {
  const [editais, setEditais] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [total, setTotal] = useState(0);

  // Filtros controlados pelo pai
  const [busca, setBusca] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [ordem, setOrdem] = useState('');

  useEffect(() => {
    carregarEditais(); // carrega todos ao iniciar
  }, []);

  const carregarEditais = (
    buscaParam = busca,
    categoriasParam = categorias,
    ordemParam = ordem,
  ) => {
    setLoading(true);
    const categoriaParam = categoriasParam.join(',');
    fetchEditais({
      page: 0,
      size: 0,
      busca: buscaParam,
      categorias,
      ordem: ordemParam,
    })
      .then((data: NoticePage) => {
        setEditais(data.content);
        setTotal(data.totalElements);
      })
      .finally(() => setLoading(false));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) return <p>Carregando editais...</p>;

  return (
    <div className={styles.page}>
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={styles.layout}>
        <Sidebar sidebarOpen={sidebarOpen} />

        <main
          className={styles.container}
          style={{
            marginLeft: sidebarOpen ? 256 : 60,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className={styles.filterContainer}>
            <SearchBar
              busca={busca}
              setBusca={setBusca}
              categorias={categorias}
              setCategorias={setCategorias}
              ordem={ordem}
              setOrdem={setOrdem}
              onSearch={carregarEditais} // só dispara a API
            />
            <p className={styles.totalEditais}>{total} editais encontrados </p>
          </div>

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

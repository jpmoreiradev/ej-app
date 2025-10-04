'use client';
import React, { useEffect, useState } from 'react';
import EditalCard from '../../components/dashboard/Card';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import Header from '../../components/dashboard/Header';
import SearchBar from '../../components/dashboard/SearchBar';
import { fetchEditais } from '../../services/editals/informativeService';
import { validateToken } from '../../services/auth/authProfile';
import { Notice, NoticePage } from '../../types/informative';
import styles from '../../styles/dashboard/Dashboard.module.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SkeletonCard from '../../components/skeleton/SkeletonCard';
import Cookies from 'js-cookie';

const EditaisPage = () => {
  const [editais, setEditais] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [total, setTotal] = useState(0);
  const [busca, setBusca] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [ordem, setOrdem] = useState('');
  const [pagina, setPagina] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        Cookies.remove('authToken');
        router.push('/login');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const cat = params.get('categoria');
      if (cat) {
        setCategorias([cat]);
        carregarEditais(true, [cat]);
      } else {
        carregarEditais(true);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (nearBottom && !loading && !loadingMore && editais.length < total) {
        carregarMaisEditais();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, editais, total]);

  const carregarEditais = (reset = false, cats?: string[]) => {
    if (reset) setLoading(true);

    setPagina((prevPagina) => {
      const pageToFetch = reset ? 1 : prevPagina;

      fetchEditais({
        page: pageToFetch,
        size: 20,
        busca,
        categorias: cats ?? categorias,
        ordem,
      })
        .then((data: NoticePage) => {
          setEditais((prevEditais) =>
            reset ? data.content : [...prevEditais, ...data.content],
          );
          setTotal(data.totalEditals);
        })
        .finally(() => {
          if (reset) setLoading(false);
          else setLoadingMore(false);
        });

      return pageToFetch + 1;
    });
  };

  const carregarMaisEditais = () => {
    if (editais.length >= total) return;
    setLoadingMore(true);
    carregarEditais();
  };

  const onSearch = () => {
    setPagina(0);
    setEditais([]);
    carregarEditais(true);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={styles.page}>
      <Header
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        editalsType="Publicos"
      />

      <div className={styles.layout}>
        <Sidebar sidebarOpen={sidebarOpen} categorias={categorias} />

        <main
          className={styles.containerWrapper}
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
              onSearch={onSearch}
            />
            <p className={styles.totalEditais}>{total} editais encontrados </p>
          </div>
          <div className={styles.cardsArea}>
            <div className={styles.container}>
              {loading
                ? Array.from({ length: 9 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : editais.map((edital, index) => (
                    <motion.div
                      key={edital['_id'] ?? index}
                      className={styles.cardWrapper}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EditalCard
                        id={edital.id ?? String(index)}
                        title={edital.titulo}
                        orgao={edital.orgaoResponsavel}
                        valorEstimado={edital.valorEstimado}
                        dataEncerramento={edital.dataEncerramento}
                        dataPublicacao={edital.dataPublicacao}
                        linkEdital={edital.linkEdital}
                        categoria={edital.categoria}
                        status={edital.status}
                        cidade={edital.cidade}
                      />
                    </motion.div>
                  ))}
            </div>
          </div>

          {loadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.loader}
            >
              <div className={styles.spinner}></div>
              <p>Carregando mais editais...</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditaisPage;

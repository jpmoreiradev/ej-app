'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Card from '../Card/Card';
import styles from './Home.module.css';
import { Notice, NoticePageProps } from '../../types/notice';

interface HomeProps extends NoticePageProps {
  fetchPage: (page: number) => Promise<NoticePageProps['noticesPage']>;
}

const Home: React.FC<HomeProps> = ({ noticesPage: initialPage, fetchPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [noticesPage, setNoticesPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const goToPage = async (newPage: number) => {
    if (loading || newPage < 0 || newPage >= noticesPage.totalPages) return;
    setLoading(true);
    try {
      const data = await fetchPage(newPage);
      setNoticesPage(data);
    } catch (err) {
      console.error('Erro ao buscar página:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.sidebarToggleIcon}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={styles.content}>
        <Sidebar isOpen={sidebarOpen} />

        <main
          className={`${styles.main} ${
            sidebarOpen ? styles.mainWithSidebar : styles.mainWithoutSidebar
          }`}
        >
          <h1 className={styles.title}>Editais Públicos</h1>

          <div className={styles.grid}>
            {noticesPage.content.map((notice: Notice) => (
              <Card key={notice.id} notice={notice} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => goToPage(noticesPage.pageable.pageNumber - 1)}
              disabled={noticesPage.first || loading}
            >
              Anterior
            </button>

            <span>
              Página {noticesPage.pageable.pageNumber + 1} de{' '}
              {noticesPage.totalPages}
            </span>

            <button
              onClick={() => goToPage(noticesPage.pageable.pageNumber + 1)}
              disabled={noticesPage.last || loading}
            >
              Próxima
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

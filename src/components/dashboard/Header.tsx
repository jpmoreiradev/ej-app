'use client';
import React from 'react';
import { PanelLeft, Building2 } from 'lucide-react';
import styles from '../../styles/dashboard/Header.module.css';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  editalsType: string;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
  editalsType,
}) => {
  const router = useRouter();
  return (
    <header
      className={styles.header}
      style={{
        marginLeft: sidebarOpen ? 256 : 60,
      }}
    >
      <button
        className={styles.menuButton}
        onClick={toggleSidebar}
        style={{
          marginLeft: sidebarOpen ? 0 : -8,
        }}
      >
        <PanelLeft size={16} />
      </button>
      <Building2 size={24} className={styles.logo} />
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>Editais {editalsType}</h1>
        <p>Concursos e licitações do setor {editalsType} </p>
      </div>

      <button
        onClick={() => {
          const url = new URL(window.location.href);
          const isTrue = url.searchParams.get('fg-interesse') === 'true';

          if (isTrue) {
            // se já está true, remove o parâmetro
            url.searchParams.delete('fg-interesse');
          } else {
            // senão, adiciona
            url.searchParams.set('fg-interesse', 'true');
          }

          window.location.href = url.toString(); // 🔄 recarrega com a nova URL
        }}
        className={styles.menuButton}
      >
        Alternar Interesse
      </button>
    </header>
  );
};

export default Header;

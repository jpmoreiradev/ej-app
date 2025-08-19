import React, { Dispatch, SetStateAction, useMemo } from 'react';
import styles from '../../styles/FilterSidebar.module.css';
import { FaTimes } from 'react-icons/fa';
import { Notice } from '../types/informative';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filter: { orgao: string; tipo: string };
  setFilter: Dispatch<SetStateAction<{ orgao: string; tipo: string }>>;
  applyFilter: () => void;
  notices: Notice[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filter,
  setFilter,
  applyFilter,
  notices,
}) => {
  const orgaosUnicos = useMemo(() => {
    const orgaos = notices.map((n) => n.orgaoResponsavel);
    return Array.from(new Set(orgaos)).sort();
  }, [notices]);

  return (
    <div
      className={`${styles.filterSidebar} ${
        isOpen ? styles.filterSidebarOpen : ''
      }`}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Filtros</h2>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <FaTimes />
        </button>
      </div>

      <label>
        Órgão Responsável:
        <select
          value={filter.orgao}
          onChange={(e) => setFilter({ ...filter, orgao: e.target.value })}
        >
          <option value="">Todos</option>
          {orgaosUnicos.map((orgao) => (
            <option key={orgao} value={orgao}>
              {orgao}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tipo de Edital:
        <select
          value={filter.tipo}
          onChange={(e) => setFilter({ ...filter, tipo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="concursos">Concursos</option>
          <option value="licitações">Licitações</option>
          <option value="auxilios">Auxílios</option>
        </select>
      </label>

      <button onClick={applyFilter}>Aplicar</button>
    </div>
  );
};

export default FilterSidebar;

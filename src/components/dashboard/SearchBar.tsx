'use client';
import React, { useEffect } from 'react';
import { Search, Filter, SortAsc, X } from 'lucide-react';
import styles from '../../styles/dashboard/SearchBar.module.css';
import { categoriasDisponiveis } from '../../config/categorias';
import CustomSelect from './CustomSelect';

interface SearchBarProps {
  busca: string;
  setBusca: (b: string) => void;
  categorias: string[];
  setCategorias: (cats: string[]) => void;
  ordem: string;
  setOrdem: (o: string) => void;
  onSearch: () => void;
}

const ordemOptions = [
  { value: 'tituloAsc', label: 'Título' },
  { value: 'desc', label: 'Mais Recentes' },
  { value: 'asc', label: 'Mais Antigos' },
];

const SearchBar: React.FC<SearchBarProps> = ({
  busca,
  setBusca,
  categorias,
  setCategorias,
  ordem,
  setOrdem,
  onSearch,
}) => {
  const currentOrderLabel =
    ordemOptions.find((o) => o.value === ordem)?.label || 'Ordem';

  const adicionarCategoria = (value: string) => {
    if (value && !categorias.includes(value)) {
      setCategorias([...categorias, value]); // apenas atualiza o estado
    }
  };

  useEffect(() => {
    if (categorias.length > 0) {
      onSearch();
    }
  }, [categorias]);

  useEffect(() => {
    if (ordem) {
      onSearch();
    }
  }, [ordem]);

  useEffect(() => {
    onSearch();
  }, [busca, categorias, ordem]);

  const removerCategoria = (value: string) =>
    setCategorias(categorias.filter((c) => c !== value));

  const temFiltros =
    busca.trim() !== '' || categorias.length > 0 || ordem.trim() !== '';

  // NOVO: Função para obter o rótulo amigável da ordem
  const getOrdemLabel = (value: string) => {
    return ordemOptions.find((o) => o.value === value)?.label || value;
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        {/* 1. SELECIONAR CATEGORIA: CustomSelect */}
        <CustomSelect
          label="Categoria"
          icon={Filter}
          currentValues={categorias}
          options={categoriasDisponiveis}
          onSelect={(value: string) => {
            adicionarCategoria(value); // já chama onSearch dentro de adicionarCategoria
          }}
          isMulti={true}
          placeholder="Categoria"
          iconClassName={styles.categoryIcon}
        />

        {/* 2. ORDEM: CustomSelect */}
        <CustomSelect
          label="Ordem"
          icon={SortAsc}
          currentValues={[ordem]}
          options={ordemOptions}
          onSelect={setOrdem}
          isMulti={false}
          placeholder={currentOrderLabel}
          iconClassName={styles.orderIcon}
        />

        {/* 3. CAMPO DE BUSCA (Input) */}
        <div className={styles.inputWrapper}>
          <Search className={`${styles.icon} ${styles.searchIcon}`} />
          <input
            type="text"
            placeholder="Buscar órgão ou título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), onSearch())
            }
            className={styles.input}
          />
        </div>

        {/* 4. BOTÃO DE BUSCA */}

        <div className={styles.buttonsWrapper}>
          <button className={styles.button} onClick={onSearch}>
            Buscar
          </button>

          <button
            className={`${styles.button} ${styles.clearButton}`}
            onClick={() => {
              setBusca('');
              setCategorias([]);
              setOrdem('');
            }}
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* FILTROS ATIVOS ATUALIZADOS */}
      <div className={styles.activeFilters}>
        {!temFiltros ? (
          <span className={styles.noFilterTag}>Nenhum filtro aplicado</span>
        ) : (
          <>
            {/* TAG DE BUSCA: MANTIDA */}
            {busca && (
              <div className={styles.filterTag}>
                <span className={styles.filterPrefix}>Busca:</span> {busca}{' '}
                <X className={styles.closeIcon} onClick={() => setBusca('')} />
              </div>
            )}

            {/* TAGS DE CATEGORIA: MANTIDAS */}
            {categorias.map((cat) => (
              <div
                key={cat}
                className={`${styles.filterTag} ${styles.categoryTag}`}
              >
                <span className={styles.filterPrefix}>Categoria:</span>
                {categoriasDisponiveis.find((c) => c.value === cat)?.label ||
                  cat}
                <X
                  className={styles.closeIcon}
                  onClick={() => removerCategoria(cat)}
                />
              </div>
            ))}

            {/* TAG DE ORDEM: ATUALIZADA PARA SER MAIS LEGÍVEL */}
            {ordem && (
              <div className={`${styles.filterTag} ${styles.orderTag}`}>
                <span className={styles.filterPrefix}>Ordem:</span>
                {getOrdemLabel(ordem)}{' '}
                <X className={styles.closeIcon} onClick={() => setOrdem('')} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

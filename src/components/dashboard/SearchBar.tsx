'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter, SortAsc, X } from 'lucide-react';
import styles from '../../styles/SearchBar.module.css';

interface SearchBarProps {
  busca: string;
  setBusca: (b: string) => void;
  categorias: string[];
  setCategorias: (cats: string[]) => void;
  ordem: string;
  setOrdem: (o: string) => void;
  onSearch: () => void; // só dispara a API
}

const SearchBar: React.FC<SearchBarProps> = ({
  busca,
  setBusca,
  categorias,
  setCategorias,
  ordem,
  setOrdem,
  onSearch,
}) => {
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState<
    { label: string; value: string }[]
  >([]);

  // Buscar categorias da API
  useEffect(() => {
    fetch('http://localhost:3001/editals/categories', {
      headers: {
        'api-key': 'minhachavesupersecreta',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Supondo que a API retorne algo como: ["saude", "educacao"]
        const categoriasMapeadas = data.map((cat: string) => ({
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
          value: cat,
        }));
        setCategoriasDisponiveis(categoriasMapeadas);
      })
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  const adicionarCategoria = (value: string) => {
    if (value && !categorias.includes(value)) {
      setCategorias([...categorias, value]);
    }
  };

  const removerCategoria = (value: string) => {
    setCategorias(categorias.filter((c) => c !== value));
  };

  const temFiltros =
    busca.trim() !== '' || categorias.length > 0 || ordem.trim() !== '';

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <div className={styles.inputWrapper}>
          <Search className={styles.icon} />
          <input
            type="text"
            placeholder="Buscar por título ou órgão"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.selectWrapper}>
          <Filter className={styles.icon} />
          <select
            onChange={(e) => {
              adicionarCategoria(e.target.value);
              e.target.value = '';
            }}
            className={styles.select}
          >
            <option value="">Selecione Categoria</option>
            {categoriasDisponiveis
              .filter((cat) => !categorias.includes(cat.value))
              .map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.selectWrapper}>
          <SortAsc className={styles.icon} />
          <select
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
            className={styles.select}
          >
            <option value="">Ordem</option>
            <option value="tituloAsc">Titulo</option>
            <option value="desc">Mais Recentes</option>
            <option value="asc">Mais Antigos</option>
            <option value="valorDesc">Maior Valor</option>
            <option value="valorAsc">Menor Valor</option>
          </select>
        </div>
        <button type="button" className={styles.button} onClick={onSearch}>
          Buscar
        </button>
      </div>

      <div className={styles.activeFilters}>
        <strong className={styles.activeFilters}>Filtros ativos: </strong>
        {!temFiltros && (
          <span className={styles.noFilterTag}>Nenhum filtro aplicado</span>
        )}
        {busca && (
          <div className={styles.filterTag}>
            {busca}{' '}
            <X className={styles.closeIcon} onClick={() => setBusca('')} />
          </div>
        )}
        {categorias.map((cat) => (
          <div key={cat} className={styles.filterTag}>
            {categoriasDisponiveis.find((c) => c.value === cat)?.label || cat}{' '}
            <X
              className={styles.closeIcon}
              onClick={() => removerCategoria(cat)}
            />
          </div>
        ))}
        {ordem && (
          <div className={styles.filterTag}>
            {ordem}{' '}
            <X className={styles.closeIcon} onClick={() => setOrdem('')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

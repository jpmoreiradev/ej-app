import React from 'react';
import styles from '../../styles/dashboard/Card.module.css';
import { Calendar, DollarSign, MapPin, Clock } from 'lucide-react';
import { formatarData } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';
import Link from 'next/link';

interface EditalCardProps {
  id: string;
  title: string;
  orgao: string;
  valorEstimado: string;
  dataPublicacao: string;
  dataEncerramento: string;
  linkEdital: string;
  categoria: string;
  status: 'Aberto' | 'Fechando' | 'fechado';
  cidade: string;
}

const categoriaMap: Record<string, string> = {
  Saúde: 'saude',
  Educação: 'educacao',
  Infraestrutura: 'infraestrutura',
  'Esporte-Cultura': 'esporte-cultura',
  'Meio Ambiente': 'meio-ambiente',
  Idosos: 'idosos',
  'não foi possível': 'outros',
};

const categoryColors: Record<string, string> = {
  saude: '#16a249', // verde forte
  educacao: '#4f46e5', // azul escuro
  infraestrutura: '#0284c7', // azul médio
  'meio-ambiente': '#059669', // verde médio
  'esporte-cultura': '#f59e0b', // laranja
  idosos: '#d946ef', // rosa/púrpura
  outros: '#6b7280', // cinza neutro
};

const categoryBackground: Record<string, string> = {
  saude: '#d1fae5', // verde claro suave
  educacao: '#e0e7ff', // azul claro suave
  infraestrutura: '#bae6fd', // azul muito claro
  'meio-ambiente': '#d1fae5', // verde claro suave
  'esporte-cultura': '#fef3c7', // laranja bem claro
  idosos: '#f5d0fe', // rosa claro
  outros: '#f3f4f6', // cinza claro
};

const statusColors: Record<EditalCardProps['status'], string> = {
  Aberto: '#166534',
  Fechando: '#89665a',
  fechado: '#9CA3AF',
};

const statusBackground: Record<EditalCardProps['status'], string> = {
  Aberto: '#dcfce7',
  Fechando: '#fef9c3',
  fechado: '#9CA3AF',
};

const getCategoryStyles = (categoria: string) => {
  const slug = categoriaMap[categoria] || 'outros';
  const background = categoryBackground[slug] || '#11ce2aff';
  const color = categoryColors[slug] || '#000';
  const border = `1px solid ${color}33`;

  return { background, color, border };
};

const formatCategoriaName = (categoria: string) => {
  if (categoria === 'não foi possível') {
    return 'Outros';
  }
  if (categoria === 'Esporte-Cultura') {
    return 'Esporte Cultura';
  }

  return categoria;
};

const EditalCard: React.FC<EditalCardProps> = ({
  id,
  title,
  orgao,
  valorEstimado,
  dataPublicacao,
  dataEncerramento,
  linkEdital,
  categoria,
  status,
  cidade,
}) => {
  const categoryStyle = getCategoryStyles(categoria);
  return (
    <div className={styles.card} style={{ borderLeft: '4px solid #3182ed' }}>
      <div className={styles.header}>
        <span className={styles.badge} style={categoryStyle}>
          {formatCategoriaName(categoria)}
        </span>
        <span
          className={styles.badge}
          style={{
            backgroundColor: statusBackground[status] + '',
            color: statusColors[status],
          }}
        >
          <Clock size={14} className="text-gray-500" />
          {status === 'Fechando' ? 'Fechando em breve' : 'Aberto'}
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      {orgao !== 'não foi possível' ? (
        <p className={styles.infoItem}>{orgao}</p>
      ) : (
        <p className={styles.infoItem}></p>
      )}

      <div className={styles.info}>
        {valorEstimado !== null && valorEstimado !== undefined ? (
          <div className={styles.infoItem}>
            <DollarSign size={16} color="#6ec68e" />
            <span className={styles.resultItems}>
              {formatMoney(valorEstimado)}
            </span>
          </div>
        ) : null}
        <div className={styles.infoItem}>
          <Calendar size={16} color="#3182ed" />
          <span>
            Publicado em:{' '}
            <span className={styles.resultItems}>
              {formatarData(dataPublicacao)}
            </span>
          </span>
        </div>
        <div className={styles.infoItem}>
          <Calendar size={16} color="#9b2020ff" />
          <span>
            Encerra em:{' '}
            <span className={styles.resultItems}>
              {formatarData(dataEncerramento)}
            </span>
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <Link href={`/editais/${id}`} className={styles.buttonEdital}>
            Ver Detalhes
          </Link>
        </div>
        {cidade !== 'não foi possível' ? (
          <div className={styles.infoItem}>
            <MapPin size={16} />
            <span>{cidade}</span>
          </div>
        ) : (
          <div className={styles.infoItem}>
            <MapPin size={16} />
            <span>Brasil</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditalCard;

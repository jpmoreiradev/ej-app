import React from 'react';
import styles from '../../styles/dashboard/Card.module.css';
import { Calendar, DollarSign, MapPin, Clock } from 'lucide-react';
import { formatarData } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';

interface EditalCardProps {
  id: string;
  title: string;
  orgao: string;
  valorEstimado: number;
  dataPublicacao: string;
  dataEncerramento: string;
  linkEdital: string;
  categoria: string;
  status: 'Aberto' | 'Fechando' | 'fechado';
  cidade: string;
}

const categoryColors: Record<EditalCardProps['categoria'], string> = {
  saude: '#16a249',
  esporte: '#FBBF24',
  educacao: '#A78BFA',
};

const categoryBackground: Record<EditalCardProps['categoria'], string> = {
  saude: '#e8fcf0',
  esporte: '#FBBF24',
  educacao: '#A78BFA',
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

const EditalCard: React.FC<EditalCardProps> = ({
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
  return (
    <div className={styles.card} style={{ borderLeft: '4px solid #3182ed' }}>
      <div className={styles.header}>
        <span
          className={styles.badge}
          style={{
            backgroundColor: categoryBackground[categoria] + '33',
            color: categoryColors[categoria],
            border: `1px solid ${categoryColors[categoria]}33`,
          }}
        >
          {categoria}
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
      <p className={styles.infoItem}>{orgao}</p>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <DollarSign size={16} color="#6ec68e" />
          <span className={styles.resultItems}>
            {' '}
            {formatMoney(valorEstimado)}
          </span>
        </div>
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
          <a
            href={linkEdital}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonEdital}
          >
            Ver Edital
          </a>
        </div>

        <div className={styles.infoItem}>
          <MapPin size={16} />
          <span>{cidade}</span>
        </div>
      </div>
    </div>
  );
};

export default EditalCard;

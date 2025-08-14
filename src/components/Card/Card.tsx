import React from 'react';
import styles from './Card.module.css';

interface Notice {
  id: number;
  titulo: string;
  orgaoResponsavel: string;
  conteudo: string;
  dataPublicacao: string;
  linkEdital: string;
}

interface CardProps {
  notice: Notice;
}

const Card: React.FC<CardProps> = ({ notice }) => {
  return (
    <div className={styles.card}>
      <h2>{notice.titulo}</h2>
      <p>
        <strong>Órgão Responsável:</strong> {notice.orgaoResponsavel}
      </p>
      <p>{notice.conteudo}</p>
      <p>
        <strong>Data da Publicação:</strong>{' '}
        {new Date(notice.dataPublicacao).toLocaleDateString()}
      </p>
      <a href={notice.linkEdital} target="_blank" rel="noopener noreferrer">
        Ver Edital
      </a>
    </div>
  );
};

export default Card;

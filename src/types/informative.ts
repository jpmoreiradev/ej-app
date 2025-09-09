export interface Notice {
  id: string;
  titulo: string;
  orgaoResponsavel: string;
  conteudo: string;
  categoria: string;
  valorEstimado: string;
  status: 'Aberto' | 'Fechando' | 'fechado';
  cidade: string;
  dataPublicacao: string;
  dataEncerramento: string;
  linkEdital: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface NoticePage {
  content: Notice[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalEditals: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface NoticePageProps {
  noticesPage?: NoticePage;
}

export interface Statistics {
  totalEditals: number;
  participatingAgencies: number;
  updated: string;
}

export interface AllEdital {
  _id: string;
  titulo: string;
  orgaoResponsavel: string;
  conteudo: string;
  pais: string;
  estado: string;
  cidade: string;
  dataPublicacao: string;
  dataLimite: string;
  linkEdital: string;
  categoria: string;
  fonte: string;
  tipo: string;
  vencimento: string;
  valorEstimado?: number;
}

export interface Statistics {
  totalEditals: number;
  participatingAgencies: number;
  totalValue: string;
}

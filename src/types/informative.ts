export interface Notice {
  id: number;
  titulo: string;
  orgaoResponsavel: string;
  conteudo: string;
  categoria: string;
  dataPublicacao: string;
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
  totalElements: number;
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

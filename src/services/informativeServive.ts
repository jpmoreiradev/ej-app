import { NoticePage } from '../types/informative';

export const fetchEditais = async (page, size): Promise<NoticePage> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/editais?page=${page}&pageSize=${size}`,
  );
  if (!res.ok) {
    throw new Error('Erro ao buscar editais');
  }
  return res.json();
};

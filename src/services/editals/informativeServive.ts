import { NoticePage } from '../../types/informative';

export const fetchEditais = async ({
  page,
  size,
  busca,
  categorias,
  ordem,
}: {
  page: number;
  size: number;
  busca?: string;
  categorias?: string[];
  ordem?: string;
}): Promise<NoticePage> => {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/summary?page=${page}&pageSize=${size}`;
  const res = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify({
      busca,
      categorias,
      ordem,
    }),
  });

  if (!res.ok) {
    throw new Error('Erro ao buscar editais');
  }

  return res.json();
};

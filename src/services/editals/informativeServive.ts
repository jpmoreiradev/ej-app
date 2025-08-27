import { NoticePage, Statistics } from '../../types/informative';

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

export async function fetchStatistics(): Promise<Statistics> {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/statistics`;
  const res = await fetch(api_url, {
    headers: {
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    cache: 'no-store', // garante dados sempre atualizados no Next.js
  });

  if (!res.ok) {
    throw new Error('Erro ao buscar estatísticas');
  }

  return res.json();
}

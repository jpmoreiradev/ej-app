import { NoticePage, Statistics, AllEdital } from '../../types/informative';

export async function fetchEditais({
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
}): Promise<NoticePage> {
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
}

export async function fetchStatistics(): Promise<Statistics> {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/statistics`;
  const res = await fetch(api_url, {
    headers: {
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Erro ao buscar estatísticas');
  }

  return res.json();
}

export async function getEditalById(id: string): Promise<AllEdital | null> {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/${id}`;
  const res = await fetch(api_url, {
    headers: {
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
  });

  if (!res.ok) return null;

  const edital: AllEdital = await res.json();
  return edital;
}

export async function getCategorias(): Promise<
  { label: string; value: string }[]
> {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/categories`;

  const response = await fetch(api_url, {
    headers: {
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  const data: string[] = await response.json();

  return data.map((cat) => ({
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: cat,
  }));
}

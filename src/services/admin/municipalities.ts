export interface Municipality {
  _id: string;
  id: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoIbge: number;
  createdAt?: string;
  __v?: number;
}

export interface CreateMunicipalityData {
  cidade: string;
  estado: string;
  pais: string;
  codigoIbge: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Listar todos os municípios
export async function getAllMunicipalities(): Promise<Municipality[]> {
  const response = await fetch(`${API_BASE_URL}/municipalities`, {
    method: 'GET',
    headers: {
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar municípios');
  }

  const data = await response.json();
  return data.municipalities || data;
}

// Buscar município por nome
export async function searchMunicipalityByName(
  cidade: string,
): Promise<Municipality> {
  const response = await fetch(
    `${API_BASE_URL}/municipalities/search/${encodeURIComponent(cidade)}`,
    {
      method: 'GET',
      headers: {
        'api-key': API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Município não encontrado');
  }

  const data = await response.json();
  return data.municipality || data;
}

// Criar novo município
export async function createMunicipality(
  data: CreateMunicipalityData,
): Promise<Municipality> {
  const response = await fetch(`${API_BASE_URL}/municipalities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao criar município');
  }

  const result = await response.json();
  return result.municipality || result;
}

// Deletar município
export async function deleteMunicipality(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/municipalities/${id}`, {
    method: 'DELETE',
    headers: {
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar município');
  }
}

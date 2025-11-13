export interface Admin {
  _id: string;
  nome: string;
  email: string;
  role: string;
  telefone?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Função para obter o token do admin logado
const getAuthToken = () => {
  return localStorage.getItem('adminToken') || '';
};

// Listar todos os admins
export async function getAllAdmins(): Promise<Admin[]> {
  const response = await fetch(`${API_BASE_URL}/admin`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar administradores');
  }

  const data = await response.json();
  return data.admins || data;
}

// Buscar admin por ID
export async function getAdminById(id: string): Promise<Admin> {
  const response = await fetch(`${API_BASE_URL}/admin/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Admin não encontrado');
  }

  const data = await response.json();
  return data.admin || data;
}

// Criar novo admin
export async function createAdmin(data: CreateAdminData): Promise<Admin> {
  const response = await fetch(`${API_BASE_URL}/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao criar administrador');
  }

  const result = await response.json();
  return result.admin || result;
}

// Atualizar admin
export async function updateAdmin(id: string, data: Partial<CreateAdminData>): Promise<Admin> {
  const response = await fetch(`${API_BASE_URL}/admin/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao atualizar administrador');
  }

  const result = await response.json();
  return result.admin || result;
}

// Desativar admin
export async function deactivateAdmin(id: string): Promise<Admin> {
  const response = await fetch(`${API_BASE_URL}/admin/${id}/deactivate`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao desativar administrador');
  }

  const result = await response.json();
  return result.admin || result;
}

// Ativar admin
export async function activateAdmin(id: string): Promise<Admin> {
  const response = await fetch(`${API_BASE_URL}/admin/${id}/activate`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao ativar administrador');
  }

  const result = await response.json();
  return result.admin || result;
}

// Deletar admin
export async function deleteAdmin(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar administrador');
  }
}

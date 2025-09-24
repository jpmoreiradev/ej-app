import Cookies from 'js-cookie';

interface authProfile {
  InstituteId: string;
  email: string;
  telefone: string;
  nome: string;
}

export const validateToken = async (): Promise<authProfile | false> => {
  const token = Cookies.get('authToken');
  if (!token) return false;
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`;

  try {
    const response = await fetch(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });

    return response.json();
  } catch {
    return false;
  }
};

import Cookies from 'js-cookie';

export const validateToken = async (): Promise<boolean> => {
  const token = Cookies.get('authToken');
  if (!token) return false;

  try {
    const response = await fetch('http://localhost:3001/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });

    return response.ok; // true se 200, false se 401 ou erro
  } catch {
    return false;
  }
};

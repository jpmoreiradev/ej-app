import Cookies from 'js-cookie';

export const validateToken = async (): Promise<boolean> => {
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

    return response.ok;
  } catch {
    return false;
  }
};

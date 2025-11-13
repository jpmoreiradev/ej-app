export async function adminLoginRequest(email: string, senha: string) {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`;
  const response = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message || 'Erro ao fazer login');
  }

  return response.json();
}

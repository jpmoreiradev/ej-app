export async function loginRequest(email: string, password: string) {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
  const response = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message);
  }

  return response.json();
}

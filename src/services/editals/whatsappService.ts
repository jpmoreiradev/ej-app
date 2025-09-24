export async function enviarMensagem(mensagem: string) {
  const api_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/whatsapp/enviar`;

  const response = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify({ mensagem }),
  });

  if (!response.ok) throw new Error('Erro ao enviar pedido de mentoria');

  return await response.json();
}

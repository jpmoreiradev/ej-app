export async function getEditais(page = 0, size = 12) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/editais?page=${page}&pageSize=${size}`,
  );
  if (!res.ok) throw new Error('Erro ao buscar editais');
  return await res.json();
}

export async function createNotice(newNotice: any) {
  const res = await fetch(`${process.env.API_BASE_URL_LOCAL}/editais`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNotice),
  });
  if (!res.ok) throw new Error('Erro ao criar edital');
  return await res.json();
}

export async function deleteNotice(id: number) {
  const res = await fetch(`${process.env.API_BASE_URL_LOCAL}/editais/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar edital');
  return true;
}

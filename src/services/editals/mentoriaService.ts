import { validateToken } from '../auth/authProfile';
import { enviarMensagem } from './whatsappService';

interface Edital {
  _id: string;
  titulo: string;
  orgaoResponsavel: string;
  cidade: string;
  estado: string;
  pais: string;
  dataPublicacao: string;
  vencimento: string;
  linkEdital: string;
  conteudo: string;
}

export async function pedirMentoriaService(edital: Edital) {
  try {
    const profileResponse = await validateToken();

    if (!profileResponse) throw new Error('Erro ao buscar perfil');

    const nomeInstituto = profileResponse.nome || 'Instituto não identificado';

    const resumo =
      edital.conteudo.length > 200
        ? edital.conteudo.substring(0, 200) + '...'
        : edital.conteudo;

    const mensagem = `
📢 Pedido de Mentoria

🏛 Instituto: ${nomeInstituto}
📱 Número: ${profileResponse.telefone}

📄 Título: ${edital.titulo}
🏢 Órgão Responsável: ${edital.orgaoResponsavel}
🌍 Local: ${edital.cidade} - ${edital.estado}, ${edital.pais}
🗓 Publicado em: ${new Date(edital.dataPublicacao).toLocaleDateString('pt-BR')}
⏳ Vencimento: ${new Date(edital.vencimento).toLocaleDateString('pt-BR')}
🔗 Link do Edital: ${edital.linkEdital}

Resumo:
${resumo}
    `.trim();

    await enviarMensagem(mensagem);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

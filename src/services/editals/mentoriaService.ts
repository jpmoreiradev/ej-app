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
📢 *Novo Pedido de Mentoria*  

Prezado(a) Mentor(a),  

Você recebeu um novo pedido de mentoria através do *Portal de Editais*.  
Uma instituição interessada busca seu apoio para o edital abaixo:  

👤 *Informações da Instituição*  
🏛 Instituto: ${profileResponse.nome}  
📱 Telefone: ${profileResponse.telefone}  
✉️ E-mail: ${profileResponse.email}  

📄 *Detalhes do Edital*  
📌 Título: ${edital.titulo}  
🏢 Órgão Responsável: ${edital.orgaoResponsavel}  
🌍 Local: ${edital.cidade} - ${edital.estado}, ${edital.pais}  
🗓 Publicado em: ${new Date(edital.dataPublicacao).toLocaleDateString('pt-BR')}  
⏳ Vencimento: ${new Date(edital.vencimento).toLocaleDateString('pt-BR')}  
🔗 Link: ${edital.linkEdital}  
📝 Resumo:  
${resumo}  

⚠️ Solicitamos que entre em contato com o instituto solicitante o mais breve possível.  
A agilidade no retorno é essencial, especialmente considerando a data de vencimento do edital.
`.trim();

    await enviarMensagem(mensagem);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

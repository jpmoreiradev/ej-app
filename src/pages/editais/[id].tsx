import styles from '../../styles/editalDetails/EditalDetalhes.module.css';
import { GetServerSideProps } from 'next';
import { getEditalById } from '../../services/editals/informativeService';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Building,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import brasao from '../../../public/images/brasao.webp';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import { useState } from 'react';
import { formatarData } from '../../utils/formatDate';
import { AllEdital } from '../../types/informative';
import { pedirMentoriaService } from '../../services/editals/mentoriaService';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const edital = await getEditalById(id as string);

  if (!edital) return { notFound: true };
  return { props: { edital } };
};

export default function EditalDetalhes({ edital }: { edital: AllEdital }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        editalsType={
          edital.tipo === 'CHAMAMENTO_PUBLICO'
            ? 'Editais Publicos'
            : edital.titulo
        }
      />

      <Sidebar sidebarOpen={sidebarOpen} />

      <div
        className={styles.container}
        style={{
          marginLeft: sidebarOpen ? '400px' : '200px',
          marginRight: sidebarOpen ? 'auto' : '150px',
          maxWidth: sidebarOpen ? '1300px' : 'calc(100% - 260px)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <div className={styles.header}>
          <div className={styles.headerTitulo}>
            <button
              className={styles.botaoVoltar}
              onClick={() => router.back()}
            >
              <ChevronLeft size={33} className={styles.volta} />
              <h2 className={styles.volta}>voltar</h2>
            </button>
            <h1 className={styles.titulo}>{edital.titulo}</h1>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.descricao}>
            <Image
              src={brasao}
              alt="Brasão"
              width={120}
              height={120}
              className={styles.brasao}
            />

            <div className={styles.meta}>
              <span>
                <MapPin size={20} className={styles.icon} />{' '}
                {edital.cidade && edital.cidade !== 'não foi possível'
                  ? edital.estado && edital.estado !== 'não foi possível'
                    ? `${edital.cidade}, ${edital.estado}`
                    : edital.cidade
                  : edital.estado && edital.estado !== 'não foi possível'
                    ? edital.estado
                    : 'Brasil'}
              </span>

              {edital.valorEstimado &&
              edital.valorEstimado !== 'não foi possível' ? (
                <span className={styles.valor}>
                  <DollarSign size={18} className={styles.icon} color="green" />{' '}
                  R$ {Number(edital.valorEstimado).toLocaleString('pt-BR')}
                </span>
              ) : (
                <span className={styles.semValor}></span>
              )}

              <span>
                <Calendar size={16} className={styles.icon} color="#3182ed" />{' '}
                Encerra em:{' '}
                <strong className={styles.strongVencimento}>
                  {edital.vencimento && edital.vencimento !== 'não foi possível'
                    ? formatarData(edital.vencimento)
                    : 'Não informado'}
                </strong>
              </span>
            </div>
            <h2 className={styles.dataPublicacao}>
              Publicado no Diário Oficial da União em:{' '}
              {formatarData(edital.dataPublicacao)}
            </h2>
            <p>{edital.conteudo}</p>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.cardAcoes}>
              <h3>Ações</h3>
              <div className={styles.acoesBotoesVertical}>
                <button
                  className={styles.botaoPrimario}
                  onClick={async () => {
                    try {
                      await pedirMentoriaService(edital);
                      alert('📩 Pedido de mentoria enviado com sucesso!');
                    } catch {
                      alert('❌ Não foi possível enviar o pedido de mentoria.');
                    }
                  }}
                >
                  <MessageCircle size={16} className={styles.iconInline} />
                  Pedir Mentoria
                </button>
                <a
                  href={edital.linkEdital}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.botaoSecundario}
                >
                  Ver Edital Oficial{' '}
                  <ExternalLink size={16} className={styles.iconInline} />
                </a>
                <p className={styles.aviso}>
                  ⚠️ Este conteúdo não substitui o publicado na versão
                  certificada!
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Informações</h3>
              <ul className={styles.listaInfo}>
                {edital.orgaoResponsavel &&
                edital.orgaoResponsavel !== 'não foi possível' ? (
                  <li>
                    <Building size={16} className={styles.icon} />{' '}
                    <strong>Órgão:</strong> {edital.orgaoResponsavel}
                  </li>
                ) : (
                  <li>
                    <Building size={16} className={styles.icon} />{' '}
                    <strong>Órgão:</strong> Não encontrado
                  </li>
                )}

                <li>
                  <Clock size={16} className={styles.icon} />{' '}
                  <strong>Status:</strong>{' '}
                  <span className={styles.status}>Aberto para inscrições</span>
                </li>

                {edital.valorEstimado &&
                  edital.valorEstimado !== 'não foi possível' && (
                    <li>
                      <DollarSign size={16} className={styles.icon} />{' '}
                      <strong>Valor Total:</strong> R${' '}
                      {Number(edital.valorEstimado).toLocaleString('pt-BR')}
                    </li>
                  )}

                {edital.vencimento &&
                edital.vencimento !== 'não foi possível' ? (
                  <li>
                    <Calendar size={16} className={styles.icon} />{' '}
                    <strong>Data de Encerramento:</strong>{' '}
                    {new Date(edital.vencimento).toLocaleDateString('pt-BR')}
                  </li>
                ) : (
                  <li>
                    <Calendar size={16} className={styles.icon} />{' '}
                    <strong>Data de Encerramento:</strong> Não encontrada
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

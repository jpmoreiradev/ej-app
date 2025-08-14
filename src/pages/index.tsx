import { GetServerSideProps, NextPage } from 'next';
import Home from '../components/Home/Home';
import { NoticePage, NoticePageProps } from '../types/notice';
import { getEditais } from '../services/informativeServive';

interface IndexProps {
  noticesPage: NoticePage;
}

const IndexPage: NextPage<IndexProps> = ({ noticesPage }) => {
  const fetchPage = async (page: number) => {
    return await getEditais(page);
  };

  return <Home noticesPage={noticesPage} fetchPage={fetchPage} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const noticesPage: NoticePage = await getEditais(0);
    return { props: { noticesPage } };
  } catch (error) {
    console.error('Erro ao buscar editais:', error);
    return {
      props: {
        noticesPage: {
          content: [],
          pageable: {
            pageNumber: 0,
            pageSize: 10,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalPages: 0,
          totalElements: 0,
          first: true,
          size: 10,
          number: 0,
          sort: { sorted: false, empty: true, unsorted: true },
          numberOfElements: 0,
          empty: true,
        },
      },
    };
  }
};

export default IndexPage;

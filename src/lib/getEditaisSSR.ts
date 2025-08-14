import { GetServerSideProps } from 'next';
import { getEditais } from '../services/informativeServive'; // função que faz fetch da API

export const getEditaisSSR: GetServerSideProps = async () => {
  try {
    const notices = await getEditais();
    return { props: { notices } };
  } catch (error) {
    console.error(error);
    return { props: { notices: [] } };
  }
};

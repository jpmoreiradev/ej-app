import { Notice } from '../types/informative';

export const filtrarEOrdenarEditais = (
  editais: Notice[],
  tituloOrOrgao: string,
  categoria: string,
  ordem: string,
) => {
  let filtrados = editais.filter((edital) => {
    const matchesTituloOrOrgao =
      edital.titulo.toLowerCase().includes(tituloOrOrgao.toLowerCase()) ||
      edital.orgaoResponsavel
        .toLowerCase()
        .includes(tituloOrOrgao.toLowerCase());

    const matchesCategoria = categoria ? edital.categoria === categoria : true;

    return matchesTituloOrOrgao && matchesCategoria;
  });

  if (ordem === 'recentes') {
    filtrados.sort(
      (a, b) =>
        new Date(b.dataPublicacao).getTime() -
        new Date(a.dataPublicacao).getTime(),
    );
  } else if (ordem === 'antigos') {
    filtrados.sort(
      (a, b) =>
        new Date(a.dataPublicacao).getTime() -
        new Date(b.dataPublicacao).getTime(),
    );
  } else if (ordem === 'alfabetica') {
    filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  return filtrados;
};

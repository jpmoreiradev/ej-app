# Oportuniza - Portal de Editais

Uma plataforma moderna e intuitiva para centralização e gestão de editais públicos, privados e internacionais.

## Sobre o Projeto

O **Oportuniza** é um portal desenvolvido para facilitar o acesso e a gestão de editais, democratizando oportunidades e aumentando a transparência na publicação de chamadas públicas, privadas e internacionais.

### Funcionalidades Principais

- **Gestão Centralizada**: Centralize todos os editais municipais em uma única plataforma
- **Conformidade Legal**: Sistema em conformidade com a LGPD e legislação municipal
- **Acesso Facilitado**: Interface moderna e intuitiva para cidadãos e gestores
- **Transparência**: Democratização do acesso às oportunidades públicas e privadas
- **Categorização**: Editais organizados por categorias (Públicos, Privados, Internacionais)
- **Sistema de Autenticação**: Área restrita com autenticação via token
- **Painel Administrativo**: Gerenciamento de editais, municípios e configurações
- **Busca e Filtros**: Sistema de busca avançado com filtros personalizados
- **Estatísticas em Tempo Real**: Visualização de dados sobre editais cadastrados e ativos

## Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) 13.5.6
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Biblioteca UI**: [React](https://reactjs.org/) 18.2.0
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Autenticação**: Cookie-based authentication com [js-cookie](https://github.com/js-cookie/js-cookie)
- **Otimização de Imagens**: [Sharp](https://sharp.pixelplumbing.com/)
- **Estilização**: CSS Modules
- **Linting**: ESLint + Prettier

## Estrutura do Projeto

```
ej-app/
├── public/
│   └── images/           # Imagens e assets estáticos
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── dashboard/    # Componentes do dashboard
│   │   ├── intro/        # Componentes da página inicial
│   │   ├── welcome/      # Componentes da página de boas-vindas
│   │   ├── skeleton/     # Componentes de loading
│   │   └── maintenance/  # Componentes de manutenção
│   ├── config/           # Arquivos de configuração
│   ├── hooks/            # Custom React Hooks
│   ├── pages/            # Páginas da aplicação (Next.js)
│   │   ├── admin/        # Área administrativa
│   │   ├── dashboard/    # Dashboards por categoria
│   │   └── editais/      # Páginas de detalhes dos editais
│   ├── services/         # Serviços e chamadas API
│   │   ├── auth/         # Serviços de autenticação
│   │   └── editals/      # Serviços de editais
│   ├── styles/           # Arquivos CSS Modules
│   ├── types/            # Definições de tipos TypeScript
│   ├── utils/            # Funções utilitárias
│   └── middleware.ts     # Middleware do Next.js
├── .env.local            # Variáveis de ambiente
└── package.json          # Dependências do projeto
```

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ej-app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

4. Edite o arquivo `.env.local` com suas configurações.

## Como Executar

### Modo de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

### Linting

```bash
npm run lint
# ou
yarn lint
```

## Páginas Principais

- `/` - Página inicial (requer autenticação)
- `/intro` - Página de apresentação do portal
- `/login` - Página de autenticação
- `/dashboard/publicos` - Dashboard de editais públicos
- `/dashboard/privados` - Dashboard de editais privados
- `/dashboard/internacionais` - Dashboard de editais internacionais
- `/editais/[id]` - Detalhes de um edital específico
- `/admin` - Área administrativa (restrita)

## Funcionalidades da Área Administrativa

- Gerenciamento de editais
- Gerenciamento de municípios
- Configurações do sistema
- Visualização de estatísticas gerais

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Convenções de Código

Este projeto utiliza:
- **ESLint** para análise estática de código
- **Prettier** para formatação automática
- **TypeScript** para tipagem estática

Certifique-se de executar `npm run lint` antes de fazer commit.

## Licença

Este projeto é privado e proprietário.

## Contato

Para dúvidas ou sugestões, entre em contato através dos canais oficiais do projeto.

---

Desenvolvido com Next.js e React

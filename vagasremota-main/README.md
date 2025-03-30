# Vagas Remota

Uma plataforma para conectar talentos remotos a oportunidades de trabalho em todo o Brasil.

## Funcionalidades

- Autenticação com Google
- Perfis para candidatos e empresas
- Listagem de vagas remotas
- Sistema de candidaturas
- Chat entre candidatos e recrutadores
- Planos de assinatura para empresas
- Painel administrativo

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Auth, Firestore)
- React Router
- Radix UI

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Firebase

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vagasremota.git
cd vagasremota
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis do Firebase:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/      # Contextos React
  ├── hooks/         # Hooks personalizados
  ├── lib/           # Configurações e utilitários
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e APIs
  ├── types/         # Tipos TypeScript
  └── App.tsx        # Componente principal
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

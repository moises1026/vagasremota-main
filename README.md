# VagasRemota

Aplicação para busca e alertas de vagas remotas, com componentes de UI modernos e responsivos construídos com React, TypeScript e Tailwind CSS.

## Funcionalidades

- Formulário de alerta de vagas
- Busca avançada de vagas
- Componente de diálogo para criação de alertas
- Suporte a internacionalização (PT/EN)
- Interface moderna e responsiva

## Tecnologias utilizadas

- React
- TypeScript
- Tailwind CSS
- Radix UI (componentes acessíveis)
- i18next (internacionalização)
- Vite (build e desenvolvimento)
- Vitest (testes)

## Como executar localmente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```
4. Acesse http://localhost:5173 no navegador

## Testes

Para executar os testes unitários:

```bash
npm run test
```

Para visualizar cobertura de testes:

```bash
npm run test:coverage
```

## Build para produção

Para gerar arquivos otimizados para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist`.

## Opções de Deploy

### Netlify

1. Crie uma conta em https://www.netlify.com/
2. Arraste a pasta "dist" para a interface de upload do Netlify
3. Ou conecte seu repositório para deploy contínuo

### Vercel

1. Crie uma conta em https://vercel.com/
2. Instale a CLI Vercel: `npm install -g vercel`
3. Execute o comando: `vercel`
4. Siga as instruções para conectar sua conta

### GitHub Pages

1. Altere a configuração base no arquivo `vite.config.ts`:
```typescript
base: '/nome-do-seu-repositorio/',
```
2. Execute o deploy:
```bash
npm run deploy
```

### Firebase Hosting

1. Crie um projeto no Firebase Console
2. Instale Firebase CLI: `npm install -g firebase-tools`
3. Faça login: `firebase login`
4. Inicialize o projeto: `firebase init`
5. Selecione Hosting e defina a pasta `dist` como diretório público
6. Execute: `firebase deploy`

## Estrutura do projeto

- `/src/components/ui` - Componentes base de UI
- `/src/components/jobs` - Componentes específicos para vagas
- `/src/hooks` - Custom hooks
- `/src/i18n` - Configuração de internacionalização
- `/src/styles` - Estilos globais
- `/src/test` - Arquivos de teste

## Licença

MIT 
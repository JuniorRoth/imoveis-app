# Imóveis App

Uma aplicação full-stack para compra e venda de imóveis com autenticação de usuários e distinção entre compradores e vendedores.

## Funcionalidades

- Autenticação de usuários (Login/Cadastro)
- Distinção entre compradores e vendedores
- Listagem de imóveis com imagens, título, descrição, preço e status
- Criação de anúncios de imóveis (apenas vendedores)
- Compra de imóveis (apenas compradores)
- Interface moderna e responsiva

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- JWT para autenticação

### Frontend
- React
- React Router
- Context API
- Tailwind CSS

## Configuração do Projeto

### Pré-requisitos
- Node.js
- MySQL
- npm ou yarn

### Backend

1. Entre no diretório do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Atualize as variáveis conforme necessário

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

### Frontend

1. Na raiz do projeto, instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
└── src/
    ├── components/
    ├── context/
    ├── pages/
    └── App.jsx
```

## Uso

1. Cadastre-se como comprador ou vendedor
2. Se for vendedor:
   - Acesse "Anunciar Imóvel" para criar um novo anúncio
   - Preencha os detalhes do imóvel
3. Se for comprador:
   - Navegue pela lista de imóveis disponíveis
   - Clique em "Comprar" para adquirir um imóvel

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

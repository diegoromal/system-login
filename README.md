# System Login

[![NestJS](https://img.shields.io/badge/NestJS-e0234e?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Zod](https://img.shields.io/badge/Zod-3e67b1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![pnpm](https://img.shields.io/badge/pnpm-f69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io)

API de autenticacao enxuta e bem arquitetada, construida com NestJS + Prisma, pensada para servir como base real de login/refresh token em projetos modernos.

- Clean Architecture na pratica
- JWT com refresh token
- Validacao com Zod
- Prisma + SQLite
- Testes unitarios e e2e

## Visao geral

Este projeto entrega um fluxo completo de autenticacao:

- cadastro de usuario
- login com geracao de auth token e refresh token
- refresh do auth token
- endpoint protegido para buscar o usuario logado

Tudo isso com separacao clara entre dominio, casos de uso e infra, evitando acoplamento e facilitando evolucao.

## Stack

- NestJS 11
- Prisma 7
- SQLite
- Zod
- JWT
- bcryptjs
- pnpm

## Estrutura do projeto

```
backend/
  src/
    domain/       # Entidades, validadores e regras de dominio
    usecases/     # Casos de uso (aplicacao)
    infra/        # Repositorios, servicos e web (controllers)
    shared/       # Utilidades e exceptions comuns
```

## Endpoints

Base URL: `http://localhost:3000`

### Criar usuario

`POST /users`

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

### Login

`POST /users/login`

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "authToken": "jwt...",
  "refreshToken": "jwt..."
}
```

### Refresh token

`POST /users/refresh`

```json
{
  "refreshToken": "jwt..."
}
```

Resposta:

```json
{
  "authToken": "jwt..."
}
```

### Buscar usuario logado

`GET /users/me`

Header:

```
Authorization: Bearer <authToken>
```

## Como rodar

### 1) Instalar dependencias

```bash
pnpm install
```

### 2) Configurar variaveis de ambiente

Crie um `.env` em `backend/`:

```
DATABASE_URL="file:./dev.db"
JWT_AUTH_SECRET="sua-chave-auth"
JWT_REFRESH_SECRET="sua-chave-refresh"
PORT=3000
```

### 3) Rodar migrations do Prisma

```bash
pnpm prisma migrate dev --name init
```

### 4) Subir a API

```bash
pnpm start:dev
```

## Testes

```bash
pnpm test
pnpm test:e2e
```

## Roadmap

- [ ] Frontend
- [ ] Dockerfile
- [ ] CI/CD
- [ ] Rate limit e protecao contra brute force

## Autor

Feito por Diego Romanio de Almeida

Se curtiu, deixa um star no repo.

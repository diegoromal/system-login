# System Login

[![NestJS](https://img.shields.io/badge/NestJS-e0234e?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Zod](https://img.shields.io/badge/Zod-3e67b1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![pnpm](https://img.shields.io/badge/pnpm-f69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-111827?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)

Full-stack authentication system with a clean NestJS API and a Next.js interface for the login flow, designed to be clear, testable, and easy to extend.

- Clean Architecture in practice
- JWT with refresh token
- Validation with Zod
- Prisma + SQLite
- Unit and e2e tests

## Overview

This project delivers a complete authentication flow across API and UI:

- user signup and login
- auth token and refresh token handling
- token refresh
- protected endpoint to fetch the logged-in user
- frontend screens wired to the API

The codebase keeps clear separation between domain, use cases, and infrastructure to avoid tight coupling and ease evolution, while the frontend mirrors the same focus on clarity and modular UI.

## Stack

Backend:

- NestJS 11
- Prisma 7
- SQLite
- Zod
- JWT
- bcryptjs

Frontend:

- Next.js 15
- React 19
- Tailwind CSS
- shadcn/ui

## Project structure

```
backend/
  src/
    domain/       # Entities, validators, domain rules
    usecases/     # Application use cases
    infra/        # Repositories, services, web (controllers)
    shared/       # Shared utilities and exceptions
frontend/
  src/
    app/          # Next.js routes
    components/   # UI components
```

## Endpoints

Base URL: `http://localhost:3000`

### Create user

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

### Fetch logged-in user

`GET /users/me`

Header:

```
Authorization: Bearer <authToken>
```

## How to run

### 1) Install dependencies

Backend:

```bash
cd backend
pnpm install
```

Frontend:

```bash
cd frontend
pnpm install
```

### 2) Configure environment variables

Create a `.env` in `backend/`:

```
DATABASE_URL="file:./dev.db"
JWT_AUTH_SECRET="your-auth-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3000
```

### 3) Run Prisma migrations

From `backend/`:

```bash
pnpm prisma migrate dev --name init
```

### 4) Run the API

From `backend/`:

```bash
pnpm start:dev
```

### 5) Run the frontend

From `frontend/`:

```bash
pnpm dev
```

If port 3000 is already taken by the API, run:

```bash
PORT=3001 pnpm dev
```

## Tests

From `backend/`:

```bash
pnpm test
pnpm test:e2e
```

## Roadmap

- [x] Frontend
- [ ] Dockerfile
- [ ] CI/CD
- [ ] Rate limiting and brute force protection

## Author

Made by Diego Romanio de Almeida

If you liked it, consider starring the repo.

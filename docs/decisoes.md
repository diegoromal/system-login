# Decisoes

- A saudacao do dashboard exibe o email retornado por `/users/me`, ja que a API atualmente nao fornece nome do usuario.
- Para integrar `asterisk.situator_events_epvseguranca`, o backend usa Postgres em `POSTGRES_URL` (default: `postgres://confast:confastpwd@localhost:5432/confast`). Como a tabela nao possui `created_at/updated_at`, os valores sao preenchidos com datas atuais ao mapear para a entidade.

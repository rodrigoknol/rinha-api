# Rinha de Backend (Q3 2023)

Repositório de uma implementação em TypeScript da [Rinha de Backend 2023](https://github.com/zanfranceschi/rinha-de-backend-2023-q3).

- Runtime JS: Deno(https://deno.land)
- DB: PostgreSQL

## Comando para rodar o servidor

`deno run --allow-net --allow-env --allow-read app/server.ts`

## Criando uma nova imagem

Primeiro rodar: `docker build -t rodrigoknolseisen/rinha-backend-ts .`, e depois: `docker push rodrigoknolseisen/rinha-backend-ts`

### Rodando os containers

```
docker-compose rm -f
docker-compose down
docker-compose up --build
```

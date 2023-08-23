# Rinha de Backend (Q3 2023)

Repositório de uma implementação em TypeScript da [Rinha de Backend 2023](https://github.com/zanfranceschi/rinha-de-backend-2023-q3).

- Runtime JS: Deno(https://deno.land)
- DB: PostgreSQL

## Comando para rodar o servidor

`deno run --allow-net --allow-env --allow-read --unstable app/server.ts`

## Criando uma nova imagem

```
docker buildx build --no-cache=true -t rodrigoknolseisen/rinha-backend-ts --builder desktop-linux --push .
```

### Rodando os containers

```
docker-compose rm -f
docker-compose down
docker-compose up --build
```

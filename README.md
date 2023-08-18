# Rinha de Backend (Q3 2023)

Repositório de uma implementação em TypeScript da [Rinha de Backend 2023](https://github.com/zanfranceschi/rinha-de-backend-2023-q3).

- Runtime JS: Deno(https://deno.land)
- DB: PostgreSQL

## Comando para rodar o servidor

`deno run --allow-net --allow-env --allow-read --unstable app/server.ts`

## Criando uma nova imagem

Para criar a imagem do buildx que montara os builds:

```
docker buildx create --name amd64_builder  --node linux_amd64_builder --platform linux/amd64
```

Para subir a imagem:

```
docker buildx build -t rodrigoknolseisen/rinha-backend-ts --builder amd64_builder --push .
```

### Rodando os containers

```
docker-compose rm -f
docker-compose down
docker-compose up --build
```

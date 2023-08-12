FROM denoland/deno:1.36.0

EXPOSE 8080

WORKDIR /app

USER deno

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

RUN deno cache app/server.ts

CMD ["run", "--allow-all", "app/server.ts"]

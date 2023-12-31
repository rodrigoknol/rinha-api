FROM denoland/deno:1.36.0

EXPOSE 8080

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

RUN deno cache app/server.ts

RUN deno compile --allow-net --allow-env --allow-read --unstable app/server.ts

ENTRYPOINT [ "./server" ]

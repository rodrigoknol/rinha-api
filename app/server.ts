import { router } from "./router.ts";

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

async function serveHttp(conn: Deno.Conn) {
  const httpConnection = Deno.serveHttp(conn);

  for await (const requestEvent of httpConnection) {
    return router(requestEvent.request, requestEvent.respondWith);
  }
}

for await (const conn of server) {
  serveHttp(conn);
}

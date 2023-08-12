import { router } from "./router.ts";

Deno.serve({ port: 8080 }, async (request) => await router(request));

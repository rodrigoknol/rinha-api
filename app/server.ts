import { router } from "./router.ts";
import { kv } from "./infra/adapter/cache-kv.ts";
import { addPeopleInBatch } from "./controller/addPeopleInBatch.ts";

const peopleCache = await kv();

Deno.serve(
  { port: 8080 },
  async (request) => await router(request, peopleCache)
);

addPeopleInBatch(peopleCache);

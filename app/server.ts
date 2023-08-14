import { router } from "./router.ts";
import { kv } from "./infra/adapter/cache-kv.ts";
import { createPeopleTable } from "./infra/gateway/createPeopleTable.ts";
import { createIndexForID } from "./infra/gateway/createIndexForID.ts";
import { addPeopleInBatch } from "./controller/addPeopleInBatch.ts";

try {
  await createPeopleTable();
  await createIndexForID();
} catch (error) {
  console.error("Error trying to create table", error);
}

const peopleCache = await kv();

Deno.serve(
  { port: 8080 },
  async (request) => await router(request, peopleCache)
);

addPeopleInBatch(peopleCache);

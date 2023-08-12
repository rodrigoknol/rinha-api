import { router } from "./router.ts";
import { createPeopleTable } from "./infra/gateway/createPeopleTable.ts";

try {
  await createPeopleTable();
} catch (error) {
  console.error("Error trying to create table", error);
}

Deno.serve({ port: 8080 }, async (request) => await router(request));

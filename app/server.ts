import { router } from "./router.ts";
import { createPeopleTable } from "./infra/gateway/createPeopleTable.ts";
import { createIndexForID } from "./infra/gateway/createIndexForID.ts";

try {
  await createPeopleTable();
  await createIndexForID();
} catch (error) {
  console.error("Error trying to create table", error);
}

Deno.serve({ port: 8080 }, async (request) => await router(request));

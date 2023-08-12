import { addPerson } from "./controller/addPerson.ts";
import { getPeopleByQuery } from "./controller/getPeopleByQuery.ts";
import { getPersonByID } from "./controller/getPersonByID.ts";
import { getTotalPeopleCount } from "./controller/getTotalPeopleCount.ts";

export const router = async (request: Request) => {
  const { method, url, body } = request;

  const { search, pathname } = new URL(url);
  const [path, pathComplement] = pathname.substring(1).split("/");
  const requestBody = body && (await request?.json?.());

  const routes = {
    pessoas: async () => {
      const isAMutation = method === "POST";
      if (isAMutation) {
        const { status, headers } = await addPerson(requestBody);
        return new Response(null, { status, headers });
      }

      if (pathComplement) {
        const { body, status } = await getPersonByID(pathComplement);
        return new Response(JSON.stringify(body), { status });
      }

      if (search) {
        const { body, status } = await getPeopleByQuery(search);
        return new Response(JSON.stringify(body), { status });
      }

      return new Response("not found", { status: 404 });
    },
    "contagem-pessoas": async () => {
      const { status, body } = await getTotalPeopleCount();
      return new Response(body, { status });
    },
  };

  const hasRoute = Object.keys(routes).find((route) => route === path);

  if (hasRoute) {
    return await routes?.[path as "pessoas" | "contagem-pessoas"]?.();
  }

  return new Response(null, { status: 404 });
};

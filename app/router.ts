import { addPerson } from "./controller/addPerson.ts";
import { getPeopleByQuery } from "./controller/getPeopleByQuery.ts";
import { getPersonByID } from "./controller/getPersonByID.ts";
import { getTotalPeopleCount } from "./controller/getTotalPeopleCount.ts";
import { ResponseHandler } from "./server.interface.ts";

export const router = async (request: Request, response: ResponseHandler) => {
  const { method, url, body } = request;

  const { search, pathname } = new URL(url);
  const [path, pathComplement] = pathname.substring(1).split("/");
  const requestBody = body && (await request.json());

  const routes = {
    pessoas: async () => {
      const isAMutation = method === "POST";
      if (isAMutation) {
        const { status } = await addPerson(requestBody);

        return response(new Response(null, { status }));
      }

      if (pathComplement) {
        const { body, status } = await getPersonByID(pathComplement);
        return response(new Response(JSON.stringify(body), { status }));
      }

      if (search) {
        const { body, status } = await getPeopleByQuery(search);
        return response(new Response(JSON.stringify(body), { status }));
      }

      return response(new Response("not found", { status: 404 }));
    },
    "contagem-pessoas": async () => {
      const { status, body } = await getTotalPeopleCount();

      return response(new Response(body, { status }));
    },
  };

  const hasRoute = Object.keys(routes).find((route) => route === path);

  if (hasRoute) {
    return await routes?.[path as "pessoas" | "contagem-pessoas"]?.();
  }

  return response(new Response(null, { status: 404 }));
};

import { addPerson } from "./controller/addPerson.ts";
import { getPeopleByQuery } from "./controller/getPeopleByQuery.ts";
import { getPersonByID } from "./controller/getPersonByID.ts";
import { getTotalPeopleCount } from "./controller/getTotalPeopleCount.ts";
import { Queue } from "./entity/queue.interface.ts";

export const router = async (request: Request, queue: Queue) => {
  const { method, url, body } = request;

  const { search, pathname } = new URL(url);
  const [path, pathComplement] = pathname.substring(1).split("/");

  const routes = {
    pessoas: async () => {
      const isAMutation = method === "POST";
      if (isAMutation) {
        const requestBody = body && (await request?.json?.());
        const { status, headers } = await addPerson(requestBody, queue.enqueue);
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

      return new Response("bad request", { status: 400 });
    },
    "contagem-pessoas": async () => {
      const { status, body } = await getTotalPeopleCount();
      return new Response(body, { status });
    },
  };

  if (path !== "pessoas" && path !== "contagem-pessoas")
    return new Response(null, { status: 404 });

  try {
    return await routes?.[path]?.();
  } catch (error) {
    console.error("Error that bubbled up to router: ", error);
    return new Response(null, { status: 500 });
  }
};

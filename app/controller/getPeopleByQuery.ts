import { PersonWithID } from "../entity/person.interface.ts";
import { getPeopleByQueryFromDB } from "../infra/gateway/getPeopleByQueryFromDB.ts";

export const getPeopleByQuery: (queryParam: string) => Promise<{
  status: 200 | 400;
  body?: PersonWithID[];
}> = async (queryParam) => {
  const [, term] = queryParam.split("=");
  if (!term) return { status: 400 };

  try {
    const queryResult = await getPeopleByQueryFromDB(term);
    return { status: 200, body: queryResult };
  } catch (error) {
    console.error("Error on query: ", error);
    return { status: 400 };
  }
};

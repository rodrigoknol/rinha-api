import { PersonWithID } from "../entity/person.interface.ts";
import { getPeopleByQueryFromDB } from "../infra/gateway/getPeopleByQueryFromDB.ts";

export const getPeopleByQuery: (queryParam: string) => Promise<{
  status: 200 | 400;
  body?: PersonWithID[];
}> = async (queryParam) => {
  const expectedSearchKey = "t";
  const query = new URLSearchParams(queryParam);

  const term = query.get(expectedSearchKey);
  if (!term) return { status: 400 };

  try {
    const listResultedFromQuery = await getPeopleByQueryFromDB(term);
    return {
      status: 200,
      body: listResultedFromQuery,
    };
  } catch (error) {
    console.error("Error while querying DB: ", error);
    return { status: 400 };
  }
};

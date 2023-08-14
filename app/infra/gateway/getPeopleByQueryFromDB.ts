import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const getPeopleByQueryFromDB = async (query: string) => {
  return (await sql`
    SELECT
      *
    FROM
      people
    WHERE
      apelido LIKE '%' ||  ${query} || '%' OR
      nome LIKE '%' || ${query} || '%' OR
      '%' || ${query} || '%' LIKE ANY(stack)
    LIMIT
      50
  `) as PersonWithID[];
};

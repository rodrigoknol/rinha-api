import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const getPeopleByQueryFromDB = async (query: string) => {
  return (await sql`
    SELECT
      id, apelido, nome, nascimento, stack
    FROM
      people
    WHERE
      apelido || nome LIKE '%' ||  ${query} || '%' OR
      '%' || ${query} || '%' LIKE ANY(stack)
    LIMIT
      50
  `) as PersonWithID[];
};

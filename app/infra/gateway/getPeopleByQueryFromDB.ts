import { PersonType } from "../../entity/person.interface.ts";
import sql from "../adapter/postgres.ts";

export const getPeopleByQueryFromDB = async (query: string) => {
  return (await sql`
    SELECT
      *
    FROM
      people
    WHERE
      apelido LIKE '%' ||  ${query} || '%' OR
      nome LIKE '%' || ${query} || '%' OR
      array_to_string( stack , ',') LIKE '%' || ${query} || '%'
    LIMIT
      50
    OFFSET
      0
  `) as (PersonType & { id: string })[];
};

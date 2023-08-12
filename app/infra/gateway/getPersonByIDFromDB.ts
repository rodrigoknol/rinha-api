import { PersonType } from "../../entity/person.interface.ts";
import sql from "../adapter/postgres.ts";

export const getPersonByIDFromDB = async (id: string) => {
  const person = await sql`
    SELECT DISTINCT 
      * 
    FROM
      people
    WHERE
      id::text LIKE ${id} 
  `;

  return person[0] as PersonType & { id: string };
};

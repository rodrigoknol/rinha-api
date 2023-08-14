import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const getPersonByIDFromDB = async (id: string) => {
  const person = await sql`
    SELECT 
      * 
    FROM
      people
    WHERE
      CAST(id AS VARCHAR) LIKE ${id} 
      AND id IS NOT NULL
    LIMIT
     1
  `;

  return person[0] as PersonWithID;
};

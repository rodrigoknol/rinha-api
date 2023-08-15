import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const getPersonByIDFromDB = async (id: string) => {
  const person = await sql`
    SELECT 
      id, apelido, nome, nascimento, stack
    FROM
      people
    WHERE
      id = ${id}::uuid
      AND id IS NOT NULL
    LIMIT
     1
  `;

  return person[0] as PersonWithID;
};

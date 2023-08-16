import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const getPersonByNicknameFromDB = async (nickname: string) => {
  if (!nickname) return undefined;

  const person = await sql`
    SELECT 
      apelido 
    FROM
      people
    WHERE
      apelido LIKE ${nickname} 
      AND apelido IS NOT NULL
    LIMIT
     1
  `;

  return person[0] as PersonWithID;
};

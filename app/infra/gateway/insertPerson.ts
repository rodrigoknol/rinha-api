import { PersonType } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

type Person = PersonType & { id: string };

export const insertPerson = async (person: Person) => {
  const { id, apelido, nome, nascimento } = person;

  const stack = person?.stack ? person?.stack : [];

  return await sql`
    INSERT INTO people
      (id, apelido, nome, nascimento, stack)
    VALUES
      (${id}, ${apelido}, ${nome}, ${nascimento}, ${stack})
  `;
};

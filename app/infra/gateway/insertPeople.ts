import { PersonType } from "../../entity/person.interface.ts";
import sql from "../adapter/postgres.ts";

type Person = PersonType & { id: string };

export const insertPeople = async (people: Person[]) => {
  const peopleValues = people
    .reduce((acc, person, index) => {
      const isFirst = index === 0;
      const leadingComma = isFirst ? "" : ",";

      const { id, apelido, nome, nascimento } = person;
      const stack = person?.stack ? person?.stack : [];

      return (
        acc +
        `${leadingComma}(${id}, ${apelido}, ${nome}, ${nascimento}, ${stack})`
      );
    }, "")
    .replaceAll(`"`, `'`);

  return await sql`
    INSERT INTO people
      (id, apelido, nome, nascimento, stack)
    VALUES
      ${peopleValues}
  `;
};

import { PersonWithID } from "../../entity/person.interface.ts";
import sql from "../adapter/db-postgres.ts";

export const insertPeople = async (people: PersonWithID[]) => {
  if (!people.length) return null;

  return await sql`
    INSERT INTO people ${sql(people)}
    ON CONFLICT DO NOTHING`;
};

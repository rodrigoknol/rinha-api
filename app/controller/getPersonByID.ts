import { PersonWithID, Year } from "../entity/person.interface.ts";
import { getPersonByIDFromDB } from "../infra/gateway/getPersonByIDFromDB.ts";

export const getPersonByID: (id: string) => Promise<{
  status: 200 | 404;
  body?: PersonWithID;
}> = async (id) => {
  const idHasTheRightLength = id.length === 36;
  if (!idHasTheRightLength) return { status: 404 };

  try {
    const person = await getPersonByIDFromDB(id);
    const personFormatted = {
      ...person,
      nascimento: new Date(person?.nascimento).toLocaleDateString(
        "fr-CA"
      ) as Year,
    };

    return { status: 200, body: personFormatted };
  } catch (error) {
    console.error("Could not find person by the provided UUID: ", error);
    return { status: 404 };
  }
};

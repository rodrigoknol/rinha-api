import { PersonWithID, Year } from "../entity/person.interface.ts";
import { getPersonByIDFromDB } from "../infra/gateway/getPersonByIDFromDB.ts";
import { delay } from "../util/delay.ts";

export const getPersonByID: (id: string) => Promise<{
  status: 200 | 404;
  body?: PersonWithID;
}> = async (id: string) => {
  const idHasTheRightLength = id.length === 36;
  if (!idHasTheRightLength) return { status: 404 };

  const getterFromDBWithDelay = async () =>
    (await delay(() => getPersonByIDFromDB(id), 400)) as PersonWithID;

  try {
    let person;
    const triesNumber = new Array(2);

    for await (const _tries of triesNumber) {
      if (person?.nascimento) break;
      person = await getterFromDBWithDelay();
    }

    const personFormatted = {
      ...person,
      nascimento: new Date(person?.nascimento || "2020-10-10")
        .toISOString()
        .split("T")[0] as Year,
    } as PersonWithID;

    return { status: 200, body: personFormatted };
  } catch (error) {
    console.error("Could not find person with the provided UUID: ", error);
    return { status: 404 };
  }
};

import { Person } from "../entity/person.ts";
import { PersonType } from "../entity/person.interface.ts";
import { insertPerson } from "../infra/gateway/insertPerson.ts";

const savePersonToDB = async (
  personToSave: PersonType & { id: string },
  headers: Headers
) => {
  await insertPerson(personToSave);

  headers.append("Location", `/pessoas/${personToSave.id}`);

  return { status: 201, headers };
};

export const addPerson: (
  request: PersonType
) => Promise<{ status: 201 | 400 | 422; headers: HeadersInit }> = async (
  request: PersonType
) => {
  const headers = new Headers();
  const personEntity = new Person(request);

  const status = personEntity.setStatusBasedOnValidity() as 400 | 422;
  if (status > 299) return { status, headers };

  const personToSave = personEntity.generatePersonWithID();

  try {
    return await savePersonToDB(personToSave, headers);
  } catch (error) {
    const errorStatus = error?.status;
    if (errorStatus === 408) {
      return await savePersonToDB(personToSave, headers);
    }
    return { status: 422, headers };
  }
};

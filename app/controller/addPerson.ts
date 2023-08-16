import { Person } from "../entity/person.ts";
import { PersonType } from "../entity/person.interface.ts";
import { getPersonByNicknameFromDB } from "../infra/gateway/getPersonByNicknameFromDB.ts";

export const addPerson: (
  request: PersonType,
  enqueue: (value: object) => void
) => Promise<{ status: 201 | 400 | 422 | 500; headers: HeadersInit }> = async (
  request: PersonType,
  enqueue: (value: object) => void
) => {
  const headers = new Headers();
  const personEntity = new Person(request);

  const status = personEntity.setStatusBasedOnValidity() as 400 | 422;
  if (status > 299) return { status, headers };

  const personToAdd = personEntity.generatePersonWithID();

  headers.append("Location", `/pessoas/${personToAdd.id}`);

  const checkIfPersonAlreadyExistsOnDB = await getPersonByNicknameFromDB(
    personToAdd.apelido
  );
  if (checkIfPersonAlreadyExistsOnDB || !personToAdd) {
    return { status: 422, headers };
  }

  try {
    enqueue(personToAdd);
    return { status: 201, headers };
  } catch (error) {
    console.error("Error trying to enqueue person", error);
    return { status: 500, headers };
  }
};

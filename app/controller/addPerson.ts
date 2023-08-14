import { Person } from "../entity/person.ts";
import { PersonType } from "../entity/person.interface.ts";
import { Queue } from "../entity/queue.interface.ts";
import { getPersonByNicknameFromDB } from "../infra/gateway/getPersonByNicknameFromDB.ts";

export const addPerson: (
  request: PersonType,
  queue: Queue
) => Promise<{ status: 201 | 400 | 422; headers: HeadersInit }> = async (
  request: PersonType,
  queue: Queue
) => {
  const headers = new Headers();
  const personEntity = new Person(request);

  const status = personEntity.setStatusBasedOnValidity() as 400 | 422;
  if (status > 299) return { status, headers };

  const personToSave = personEntity.generatePersonWithID();

  headers.append("Location", `/pessoas/${personToSave.id}`);

  const personAlreadyExistsOnDB = await getPersonByNicknameFromDB(
    personToSave.apelido
  );

  if (personAlreadyExistsOnDB) {
    return { status: 422, headers };
  }

  queue.enqueue(personToSave);
  return { status: 201, headers };
};

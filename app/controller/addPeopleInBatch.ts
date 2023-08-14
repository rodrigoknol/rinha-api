import { PersonWithID } from "../entity/person.interface.ts";
import { Queue } from "../entity/queue.interface.ts";
import { insertPeople } from "../infra/gateway/insertPeople.ts";

let msgQeue: PersonWithID[] = [];
let isFetching = false;

export const addPeopleInBatch = (peopleQueue: Queue) => {
  peopleQueue.listener(async (msg) => {
    msgQeue.push(msg as PersonWithID);
    if (!isFetching) {
      const dataToAdd = [...msgQeue];
      msgQeue = [];
      await addDataToDB(dataToAdd);
    }
  });

  const addDataToDB = async (dataToAdd: PersonWithID[]) => {
    isFetching = true;
    await insertPeople(dataToAdd);
    isFetching = false;
  };
};

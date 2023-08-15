import { PersonWithID } from "../entity/person.interface.ts";
import { Queue } from "../entity/queue.interface.ts";
import { insertPeople } from "../infra/gateway/insertPeople.ts";

let msgQeue: PersonWithID[] = [];

export const addPeopleInBatch = (peopleQueue: Queue) => {
  peopleQueue.listener((msg) => {
    msgQeue.push(msg as PersonWithID);
  });

  setInterval(() => {
    const dataToAdd = [...msgQeue];
    msgQeue = [];
    insertPeople(dataToAdd);
  }, 600);
};

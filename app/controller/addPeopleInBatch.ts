import { PersonWithID } from "../entity/person.interface.ts";
import { Queue } from "../entity/queue.interface.ts";
import { insertPeople } from "../infra/gateway/insertPeople.ts";
import { randomNumberFromRange } from "../util/randomNumberFromRange.ts";

let msgQeue: PersonWithID[] = [];

export const addPeopleInBatch = (peopleQueue: Queue) => {
  peopleQueue.listener((msg) => {
    msgQeue[msgQeue.length] = msg as PersonWithID;
  });

  setInterval(() => {
    const dataToAdd = [...msgQeue];
    msgQeue = [];
    insertPeople(dataToAdd);
  }, randomNumberFromRange(800, 950));
};

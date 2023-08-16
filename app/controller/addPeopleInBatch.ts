import { PersonWithID } from "../entity/person.interface.ts";
import { Queue } from "../entity/queue.interface.ts";
import { insertPeople } from "../infra/gateway/insertPeople.ts";

let msgQeue: PersonWithID[] = [];
let lastInsertion = new Date().getTime();

const peopleInserter = () => {
  const dataToAdd = [...msgQeue];
  msgQeue = [];
  lastInsertion = new Date().getTime();
  insertPeople(dataToAdd);
};

export const addPeopleInBatch = (peopleQueue: Queue) => {
  peopleQueue.listener((msg) => {
    const { length } = msgQeue;
    msgQeue[length] = msg as PersonWithID;

    const isQueueFull = length > 30;
    const passedEnoughTime =
      (new Date().getTime() - lastInsertion) / 6000 > 0.5;

    if (isQueueFull || passedEnoughTime) {
      peopleInserter();
    }
  });
};

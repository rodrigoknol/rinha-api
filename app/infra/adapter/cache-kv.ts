import { Queue } from "../../entity/queue.interface.ts";

export const kv = async () => {
  const db = await Deno.openKv();

  const enqueue = async (value: object) => await db.enqueue(value);

  const listener = (callback: (msg: object) => void) =>
    db.listenQueue((msg: unknown) => callback(msg as object));

  return { enqueue, listener } as Queue;
};

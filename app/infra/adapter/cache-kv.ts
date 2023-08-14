import { Queue } from "../../entity/queue.interface.ts";

export const kv = async () => {
  const db = await Deno.openKv();

  const enqueue = async (value: object) => await db.enqueue(value);
  const listener = (callback: (msg: unknown) => void) =>
    db.listenQueue((msg) => callback(msg));

  return { enqueue, listener } as Queue;
};

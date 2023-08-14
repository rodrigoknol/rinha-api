export interface Queue {
  enqueue: (value: object) => void;
  listener: (callback: (msg: unknown) => void) => Promise<void>;
}

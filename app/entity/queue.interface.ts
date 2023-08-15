export interface Queue {
  enqueue: (value: object) => void;
  listener: (callback: (msg: object) => void) => Promise<void>;
}

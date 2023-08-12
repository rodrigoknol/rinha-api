export type ResponseHandler = (
  r: Response | PromiseLike<Response>
) => Promise<void>;

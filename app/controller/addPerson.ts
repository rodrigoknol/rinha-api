import { Person } from "../entity/person.ts";

export const addPerson: (
  request: any
) => Promise<{ status: 201 | 400 | 422; headers: HeadersInit }> = async (
  request: any
) => {
  console.log(request);

  const headers = new Headers();
  const person = new Person(request);

  const status = person.setStatusBasedOnValidity() as 400 | 422;
  if (status > 299) return { status, headers };

  headers.append("Location", ` /pessoas/123-432`);

  return { status: 201, headers };
};

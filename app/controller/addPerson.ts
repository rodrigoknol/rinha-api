export const addPerson: (
  request: any
) => Promise<{ status: 201 | 400 | 422 }> = async (request: any) => {
  console.log(request);

  return { status: 400 };
};

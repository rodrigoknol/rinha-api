export const getPersonByID: (
  id: string
) => Promise<{ status: 200 | 404; body: any }> = async (id) => {
  console.log(id);
  return { status: 200, body: "pessoa" };
};

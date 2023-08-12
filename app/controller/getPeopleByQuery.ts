export const getPeopleByQuery: (
  queryParam: string
) => Promise<{ status: 200 | 400; body: any[] }> = async (queryParam) => {
  console.log(queryParam);

  return {
    status: 200,
    body: [],
  };
};

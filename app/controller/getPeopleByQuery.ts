export const getPeopleByQuery: (
  queryParam: string
) => Promise<{ status: 200 | 400; body: any[] }> = async (queryParam) => {
  const expectedSearchKey = "t";
  const query = new URLSearchParams(queryParam);

  const term = query.get(expectedSearchKey);
  if (!term) return { status: 400, body: [] };

  

  return {
    status: 200,
    body: [],
  };
};

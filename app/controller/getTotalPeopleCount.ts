export const getTotalPeopleCount: () => Promise<{
  status: 200 | 400;
  body: string;
}> = async () => {
  return {
    status: 200,
    body: "10",
  };
};

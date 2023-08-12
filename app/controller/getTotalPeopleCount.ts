import { getTableTotalNumberOfRows } from "../infra/gateway/getTableTotalNumberOfRows.ts";

export const getTotalPeopleCount: () => Promise<{
  status: 200 | 400;
  body: string;
}> = async () => {
  const totalRows = await getTableTotalNumberOfRows();

  return {
    status: 200,
    body: totalRows,
  };
};

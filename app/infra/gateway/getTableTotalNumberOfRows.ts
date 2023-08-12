import sql from "../adapter/postgres.ts";

export const getTableTotalNumberOfRows = async () => {
  return (
    await sql`
    SELECT 
      COUNT(*) 
    FROM
      people
    `
  )[0].count;
};

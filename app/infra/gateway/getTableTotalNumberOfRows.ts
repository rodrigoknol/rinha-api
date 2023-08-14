import sql from "../adapter/db-postgres.ts";

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

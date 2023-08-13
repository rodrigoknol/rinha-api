import sql from "../adapter/postgres.ts";

export const createIndexForID = async () => {
  return await sql`
    CREATE INDEX IF NOT EXISTS idx_uuid
    ON people(id)
  `;
};

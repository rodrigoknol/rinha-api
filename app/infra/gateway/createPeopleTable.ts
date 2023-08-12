import sql from "../adapter/postgres.ts";

export const createPeopleTable = async () => {
  return await sql`
    CREATE TABLE IF NOT EXISTS people (
      id uuid NOT NULL UNIQUE PRIMARY KEY,
      apelido VARCHAR (32) NOT NULL UNIQUE,
      nome VARCHAR (100) NOT NULL,
      nascimento DATE NOT NULL,
      stack VARCHAR[]
    )
  `;
};

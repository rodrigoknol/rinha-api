import postgres from "https://deno.land/x/postgresjs@v3.3.5/mod.js";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "rinha",
  username: "postgres",
  max: 20,
});

export default sql;

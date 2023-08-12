import { postgres } from "../../../deps.ts";

const sql = postgres({
  host: "db",
  port: 5432,
  database: "rinha",
  username: "postgres",
  password: "password",
  max: 20,
});

export default sql;

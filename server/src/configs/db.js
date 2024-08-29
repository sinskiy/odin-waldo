import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
});
export default pool;

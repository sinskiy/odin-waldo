import pool from "../configs/db.js";

export async function getMatchingTarget(x, y) {
  const point = `(${x},${y})`;
  const result = await pool.query(
    "SELECT name FROM targets WHERE coords @> $1::point",
    [point],
  );

  const target = result.rows[0];
  return target;
}

import pool from "../configs/db";

export async function getMatchingTarget(x, y) {
  const point = `(${x},${y})`;
  const result = await pool.query(
    "SELECT target FROM targets WHERE target @> $1::point",
    [point],
  );

  const target = result.rows[0];
  return target;
}

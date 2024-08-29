import pool from "../configs/db";

export async function getMatchingTarget(point) {
  const coords = `(${point.x},${point.y})`;
  const result = await pool.query(
    "SELECT target FROM targets WHERE target @> $1::point",
    [coords],
  );

  const target = result.rows[0];
  return target;
}

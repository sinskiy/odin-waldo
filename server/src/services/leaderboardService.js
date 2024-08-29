import pool from "../configs/db.js";

export async function getLeaderboardByTime(limit = false) {
  const result = await pool.query(
    "SELECT username, time FROM leaderboard ORDER BY time LIMIT $1",
    [limit || "999"],
  );

  const leaderboard = result.rows;
  return leaderboard;
}

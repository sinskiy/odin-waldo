import pool from "../configs/db.js";

export async function getLeaderboardByTime(limit = false) {
  const result = await pool.query(
    "SELECT username, time FROM leaderboard ORDER BY time LIMIT $1",
    [limit || "999"],
  );

  const leaderboard = result.rows;
  return leaderboard;
}

export async function addLeaderboardEntry(username, time) {
  await pool.query("INSERT INTO leaderboard (username, time) VALUES ($1, $2)", [
    username,
    time,
  ]);
}

import {
  addLeaderboardEntry,
  getLeaderboardByTime,
} from "../services/leaderboardService.js";

export async function leaderboardGet(req, res, next) {
  const { limit } = req.query;
  try {
    const leaderboard = await getLeaderboardByTime(Number(limit));
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
}

export async function leaderboardPost(req, res, next) {
  const { username, time } = req.body;
  try {
    await addLeaderboardEntry(username, Number(time));
    res.status(201).json({ message: "ok" });
  } catch (err) {
    next(err);
  }
}

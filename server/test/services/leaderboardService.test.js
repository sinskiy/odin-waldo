import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import pool from "../../src/configs/db.js";
import {
  addLeaderboardEntry,
  getLeaderboardByTime,
} from "../../src/services/leaderboardService.js";

beforeAll(async () => {
  try {
    await pool.query("DELETE FROM leaderboard");
    await pool.query(
      "INSERT INTO leaderboard (username, time) VALUES ('sinskiy', 20), ('kilwinta', 200), ('bot', 1)",
    );
  } catch (err) {
    /* empty */
  }
});

describe("get leaderboard correctly", () => {
  it("get full leaderboard correctly", async () => {
    const leaderboard = await getLeaderboardByTime();
    expect(leaderboard).toStrictEqual([
      { username: "bot", time: 1 },
      { username: "sinskiy", time: 20 },
      { username: "kilwinta", time: 200 },
    ]);
  });

  it("get leaderboard with limit correctly", async () => {
    const leaderboard2 = await getLeaderboardByTime(1);
    expect(leaderboard2).toStrictEqual([{ username: "bot", time: 1 }]);
  });
});

describe("add leaderboard entries correctly", () => {
  it("add normal entry correctly", async () => {
    expect(await addLeaderboardEntry("bot", 2)).toBeUndefined();
    const leaderboard3 = await getLeaderboardByTime(2);
    expect(leaderboard3).toStrictEqual([
      { username: "bot", time: 1 },
      { username: "bot", time: 2 },
    ]);
  });
});

afterAll(async () => {
  await pool.end();
});

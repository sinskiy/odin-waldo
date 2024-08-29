import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import pool from "../../src/configs/db.js";
import { getLeaderboardByTime } from "../../src/services/leaderboardService.js";

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
    const target = await getLeaderboardByTime();
    expect(target).toStrictEqual([
      { username: "bot", time: 1 },
      { username: "sinskiy", time: 20 },
      { username: "kilwinta", time: 200 },
    ]);
  });

  it("get leaderboard with limit correctly", async () => {
    const target2 = await getLeaderboardByTime(1);
    expect(target2).toStrictEqual([{ username: "bot", time: 1 }]);
  });
});

afterAll(async () => {
  await pool.end();
});

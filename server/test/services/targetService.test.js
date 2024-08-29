import { afterAll, beforeAll, expect, test } from "@jest/globals";
import pool from "../../src/configs/db";
import { getMatchingTarget } from "../../src/services/targetService";

beforeAll(async () => {
  try {
    await pool.query(
      "INSERT INTO targets VALUES ('((0,0),(100,100))'), ('((200,300),(300,400))'), ('((500,500),(500,500))')",
    );
  } catch (err) {
    /* empty */
  }
});

test("Get matching targets correctly", async () => {
  const target = await getMatchingTarget(1, 1);
  expect(target).toEqual({ name: "test1" });

  const target2 = await getMatchingTarget(500, 500);
  expect(target2).toEqual({ name: "test3" });

  const target3 = await getMatchingTarget(600, 600);
  expect(target3).toBeUndefined();

  const target4 = await getMatchingTarget(301, 350);
  expect(target4).toBeUndefined();
});

afterAll(async () => {
  await pool.end();
});

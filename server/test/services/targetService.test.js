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
  const target = await getMatchingTarget({ x: 1, y: 1 });
  expect(target).toEqual({ target: "(100,100),(0,0)" });

  const target2 = await getMatchingTarget({ x: 500, y: 500 });
  expect(target2).toEqual({ target: "(500,500),(500,500)" });

  const target3 = await getMatchingTarget({ x: 600, y: 600 });
  expect(target3).toBeUndefined();

  const target4 = await getMatchingTarget({ x: 301, y: 350 });
  expect(target4).toBeUndefined();
});

afterAll(async () => {
  await pool.end();
});

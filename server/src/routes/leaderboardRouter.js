import { Router } from "express";
import {
  getLeaderboard,
  postLeaderboardEntry,
} from "../controllers/leaderboardController";
const leaderboardRouter = Router();

leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.post("/", postLeaderboardEntry);

export default leaderboardRouter;

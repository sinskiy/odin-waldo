import { Router } from "express";
import {
  leaderboardGet,
  leaderboardPost,
} from "../controllers/leaderboardController.js";
const leaderboardRouter = Router();

leaderboardRouter.get("/", leaderboardGet);
leaderboardRouter.post("/", leaderboardPost);

export default leaderboardRouter;

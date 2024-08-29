import { Router } from "express";
import leaderboardRouter from "./leaderboardRouter.js";
import targetRouter from "./targetRouter.js";
const apiRouter = Router();

apiRouter.use("/leaderboard", leaderboardRouter);
apiRouter.use("/target", targetRouter);
export default apiRouter;

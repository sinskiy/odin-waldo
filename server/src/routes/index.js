import { Router } from "express";
import leaderboardRouter from "./leaderboardRouter.js";
import targetRouter from "./targetRouter.js";
import timerRouter from "./timerRouter.js";
const apiRouter = Router();

apiRouter.use("/leaderboard", leaderboardRouter);
apiRouter.use("/target", targetRouter);
apiRouter.use("/timer", timerRouter);
export default apiRouter;

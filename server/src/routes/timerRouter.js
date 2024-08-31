import { Router } from "express";
import { timerGet } from "../controllers/timerController.js";
const timerRouter = Router();

timerRouter.get("/", timerGet);

export default timerRouter;

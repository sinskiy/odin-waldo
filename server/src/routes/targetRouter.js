import { Router } from "express";
import { checkTarget } from "../controllers/targetController";
const targetRouter = Router();

targetRouter.get("/", checkTarget);

export default targetRouter;

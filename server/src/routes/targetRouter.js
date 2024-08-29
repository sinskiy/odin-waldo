import { Router } from "express";
import { targetGet } from "../controllers/targetController";
const targetRouter = Router();

targetRouter.get("/", targetGet);

export default targetRouter;

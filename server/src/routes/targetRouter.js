import { Router } from "express";
import { targetGet } from "../controllers/targetController.js";
const targetRouter = Router();

targetRouter.get("/", targetGet);

export default targetRouter;

import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./src/routes/index.js";
const app = express();
app.use(cors());

app.use("/api", apiRouter);

// TODO: add error middleware

const port = process.env.PORT ?? 3000;
app.listen(
  port,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log("http://localhost:" + port),
);

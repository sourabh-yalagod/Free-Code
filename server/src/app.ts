import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Everything Right...!" });
  return;
});

export default app;

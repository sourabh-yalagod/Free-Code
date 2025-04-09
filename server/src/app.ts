import express, { Request, Response } from "express";
import ApiError from "./utils/ApiError";
import cors from "cors";
import Queue from "bull";
import { config } from "dotenv";
import { handleCodeExecution } from "./queue/code";
config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Everything Right...!" });
  return;
});

export const jobQueue = new Queue("jobQueue", {
  redis: { host: "localhost", port: 6379 },
});

jobQueue.getJob("jobQueue").then((res) => console.log(res));

app.post("/code", async (req, res) => {
  const { code, language } = req.body;
  if (!code || !language) {
    res.status(400).json({ error: "Language and Code are required!" });
    return;
  }

  try {
    const job = await jobQueue.add({ code, language });
    handleCodeExecution();
    console.log("Job added:", job.id);
    res.status(200).json({ success: true, jobId: job.id });
  } catch (err) {
    console.error("Job Add Error:", err);
    res.status(500).json({ error: "Failed to add job to queue" });
  }
});

export default app;

import express, { Request, Response } from "express";
import cors from "cors";
import Queue from "bull";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
config();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

export const jobQueue = new Queue("jobQueue", {
  redis: { host: "localhost", port: 6379 },
});

export const wss = new WebSocketServer({ server });
import codeRouters from "./routers/code";
import handleSocket from "./utils/handleSocket";
app.use("/api/code", codeRouters);

wss.on("connection", handleSocket);

export default server;

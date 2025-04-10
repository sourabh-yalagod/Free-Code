import { Router } from "express";
import { codeExecution } from "../controllers/code";
import { auth } from "../middleware/auth";

const router = Router();

router.route("/execute").post(codeExecution);

export default router;

import { Router } from "express";
import helloRouter from "./webhooks";

const router = Router();

router.use("/api", helloRouter);

export default router;
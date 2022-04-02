import { Router } from "express";
import helloRouter from "./hello";

const router = Router();

router.use("/api", helloRouter);

export default router;
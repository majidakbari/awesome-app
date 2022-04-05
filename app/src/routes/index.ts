import {Router} from "express";
import webhooks from "./webhooks";

const router = Router();

router.use("/api", webhooks);

export default router;
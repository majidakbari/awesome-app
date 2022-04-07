import {Router} from "express";
import webhooks from "./webhooks";
import webhookAccessCheckHandler from "../middlewares/webhookAccessCheckHandler";

const router = Router();

router.use("/api", webhookAccessCheckHandler, webhooks);

export default router;
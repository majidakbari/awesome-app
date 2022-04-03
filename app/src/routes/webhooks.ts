import {Router} from "express";
import asyncHandler from "../utils/asyncHandler";
import webhookController from "../controllers/webhookController";
import methodNotAllowedHandler from "../utils/methodNotAllowedHandler";

const router = Router();

router.route('/webhook').get(asyncHandler(webhookController)).all(methodNotAllowedHandler);

export default router;
import {Router} from "express";
import asyncHandler from "../utils/asyncHandler";
import webhookController from "../controllers/webhookController";
import methodNotAllowedHandler from "../utils/methodNotAllowedHandler";
import validationErrorHandler from "../utils/validationErrorHandler";
import webhookValidationRules from "../validations/webhookValidationRules";

const router = Router();

router.route('/webhook')
    .post(webhookValidationRules, validationErrorHandler, asyncHandler(webhookController))
    .all(methodNotAllowedHandler);

export default router;
import {Router} from "express";
import MethodNotAllowedError from "../errors/methodNotAllowedError";
import dispatchEvent from "../integrations/rabbitmq";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.route('/hello').get(asyncHandler(async (req, res, next) => {
    const r = await dispatchEvent({
        eventType: "user_created",
        eventBody: "Hello it's me"
    }, 'default-queue').catch(err => {throw err});
    return res.send({
        message: "Hello world"
    })
})).all(() => {
    throw new MethodNotAllowedError();
});

export default router;
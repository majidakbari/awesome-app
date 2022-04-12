import {RequestHandler} from "express";
import AccessDeniedError from "../errors/clinetErrors/accessDeniedError";
import * as crypto from "crypto";

const webhookAccessCheckHandler: RequestHandler = (req, res, next) => {
    const signature = req.headers ? req.headers["x-tribe-signature"] : undefined;
    const timestamp = req.headers ? req.headers["x-tribe-request-timestamp"] : undefined;

    if (!signature || !timestamp || !verifySignature({
        signature: signature as string,
        body: JSON.stringify(req.body),
        timestamp: parseInt(timestamp as string)
    })) {
        throw new AccessDeniedError();
    }
    next();
};

export const getSignature = (options: { body: string; timestamp: number }): string => {
    const {body, timestamp} = options;
    const secret = process.env.SIGNING_SECRET as string;
    return crypto.createHmac("sha256", secret).update(`${timestamp}:${body}`).digest("hex");
};

export const verifySignature = (options: { signature: string; body: string; timestamp: number }): boolean => {
    const {signature, body, timestamp} = options;
    const timeDifference = (timestamp - new Date().getTime()) / 60000;
    if (timeDifference > 5) return false;
    const hash = getSignature({body, timestamp});
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hash));
};

export default webhookAccessCheckHandler;
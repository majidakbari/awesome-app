import dispatchEvent from "../integrations/rabbitmq";
import {RequestHandler} from "express";

const webhookController: RequestHandler = async (req, res) => {
    await dispatchEvent({
        eventType: "user_created",
        eventBody: "Hello it's me"
    }, 'default-queue').catch(err => {throw err});
    return res.send({
        message: "Hello world"
    })
};

export default webhookController;
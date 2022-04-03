import dispatchEvent from "../integrations/rabbitmq";
import {RequestHandler} from "express";

const webhookController: RequestHandler = async (req, res) => {
    await dispatchEvent({
        eventType: req.body.data.type,
        eventBody: JSON.stringify(req.body.data)
    });
    return res.send({
        type: req.body.type,
        status: "SUCCEEDED",
        data: req.body.data
    })
};

export default webhookController;
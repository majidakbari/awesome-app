import {RequestHandler} from "express";
import manageWebhookService from "../services/manageWebhookService";

const webhookController: RequestHandler = async (req, res) => {
    const event = {
        eventType: req.body.data.name ?? 'TEST',
        eventBody: req.body.data
    };
    await manageWebhookService(event);

    console.log(req.body)

    return res.send({
        type: event.eventType,
        status: "SUCCEEDED",
        data: event.eventBody
    })
};

export default webhookController;
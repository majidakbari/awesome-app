import dispatchEvent from "../integrations/rabbitmq";
import {RequestHandler} from "express";
import dbConnection from "../utils/dbConnection";

const webhookController: RequestHandler = async (req, res) => {
    // await dispatchEvent({
    //     eventType: req.body.data.type,
    //     eventBody: JSON.stringify(req.body.data)
    // });

    await dbConnection();

    return res.send({
        type: req.body.type,
        status: "SUCCEEDED",
        data: req.body.data
    })
};

export default webhookController;
import {body} from "express-validator"

const webhookValidationRules = [
    body("networkId").exists().isString(),
    body("context").exists().isString(),
    body("type").exists().isString(),
    body("data").exists().isObject(),
];

export default webhookValidationRules;
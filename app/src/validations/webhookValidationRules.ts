import { body } from "express-validator"

const webhookValidationRules = [
    body('networkId').exists().isString(),
    body('context').exists().isString(),
    body('entityId').exists().isString(),
    body('type').exists().isString(),
    body('data').exists().isObject(),
    body('data.name').exists().isString(),
    body('data.noun').exists().isString(),
    body('data.verb').exists().isString(),
    body('data.actor').exists().isObject(),
    body('data.object').exists().isObject(),
    body('data.target').exists().isObject()
];

export default webhookValidationRules;
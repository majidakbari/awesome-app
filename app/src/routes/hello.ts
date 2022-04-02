import {Router} from "express";
import MethodNotAllowedError from "../errors/methodNotAllowedError";

const router = Router();

router.route('/hello').get((req, res) => {
    return res.send({
        message: "Hello world"
    })
}).all(() => {
    throw new MethodNotAllowedError()
});

export default router;
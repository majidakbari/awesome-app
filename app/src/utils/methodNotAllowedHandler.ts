import MethodNotAllowedError from "../errors/methodNotAllowedError";

const methodNotAllowedHandler = () => {
    throw new MethodNotAllowedError();
};

export default methodNotAllowedHandler;
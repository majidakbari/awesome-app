import MethodNotAllowedError from "../errors/clinetError/methodNotAllowedError";

const methodNotAllowedHandler = () => {
    throw new MethodNotAllowedError();
};

export default methodNotAllowedHandler;
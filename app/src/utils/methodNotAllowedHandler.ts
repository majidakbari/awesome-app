import MethodNotAllowedError from "../errors/clinetErrors/methodNotAllowedError";

const methodNotAllowedHandler = () => {
    throw new MethodNotAllowedError();
};

export default methodNotAllowedHandler;
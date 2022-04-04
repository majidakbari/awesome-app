import createServer from "../utils/createServer";

createServer().listen(process.env.NODE_PORT || 3000);
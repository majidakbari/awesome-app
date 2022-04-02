import createServer from "../utils/server";

createServer().listen(process.env.NODE_PORT || 3000);
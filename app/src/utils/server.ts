import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import appRouter from "../routes/index";
import corsHandler from "../middlewares/corsHandler";
import errorHandler from "../middlewares/errorHandler";
import routeHandler from "../middlewares/routeHandler";
import acceptableHandler from "../middlewares/appectableRequestHandler";

const createServer = () => {
    dotenv.config();
    const app = express();
    app.use(helmet());
    app.use(corsHandler);
    app.use(acceptableHandler);
    app.use(appRouter);
    app.use(routeHandler);
    app.use(errorHandler);
    return app;
}

export default createServer;
import("express-async-errors");
import express, { Express } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { routes } from "@app/routes";
import config from "@infrastructure/config";
import {
  ServerErrorMiddleware,
  ServerNotFoundMiddleware,
} from "@infrastructure/middlewares";
import { Container, Inject } from "@decorators/di";
import { NOT_FOUND_MIDDLEWARE } from "./container";
import { ERROR_MIDDLEWARE } from "@decorators/express";
import passport from "passport";
import("../libs/strategies/auth.local"); // configuration of passport
import swaggerUI from "swagger-ui-express";
const swaggerDocument = require(config.SWAGGER_PATH);

class Server {
  app: Express;
  config;
  constructor(
    @Inject(NOT_FOUND_MIDDLEWARE)
    private serverNotFoundMiddleware: ServerNotFoundMiddleware,
    @Inject(ERROR_MIDDLEWARE)
    private serverErrorMiddleware: ServerErrorMiddleware
  ) {
    this.app = express();
    this.config = config;
  }
  start() {
    return new Promise((resolve) => {
      this.app
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())
        .use(morgan("dev"))
        .use(passport.initialize())
        .use("/api", routes)
        .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
        .use(this.serverNotFoundMiddleware.use)
        .use(this.serverErrorMiddleware.use);
      this.app.listen(this.config.PORT, () => {
        console.log(
          this.config.APPLICATION_NAME +
            " API RUNNING ON PORT " +
            this.config.PORT
        );
        resolve("");
      });
    });
  }
}

const SERVER_NOT_FOUND = Container.get<ServerNotFoundMiddleware>(
  ServerNotFoundMiddleware
);

const SERVER_ERROR = Container.get<ServerErrorMiddleware>(
  ServerErrorMiddleware
);

export const server = new Server(SERVER_NOT_FOUND, SERVER_ERROR);
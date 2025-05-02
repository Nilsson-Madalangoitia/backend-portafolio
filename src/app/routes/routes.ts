import {
  HelloWorldController,
  AuthController,
  UserController,
  RolController,
  AnioController,
} from "@app/controllers";
import { attachControllers } from "@decorators/express";
import express from "express";

class Routes {
  private apiRouter: express.Router;
  constructor() {
    this.apiRouter = express.Router();
  }
  start(): express.Router {
    attachControllers(this.apiRouter, [
      HelloWorldController,
      AuthController,
      UserController,
      RolController,
      AnioController,
    ]);
    return this.apiRouter;
  }
}

export const routes = new Routes().start();

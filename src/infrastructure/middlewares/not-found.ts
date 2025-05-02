import { Injectable } from "@decorators/di/lib";
import { Middleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";


@Injectable()
export class ServerNotFoundMiddleware implements Middleware {
    use(request: Request, response: Response, next: NextFunction): Response {
    return response.status(400)
                    .send({ status: 400, success: false, message: "Resource not found" });
  }
}
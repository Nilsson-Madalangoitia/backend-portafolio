import { Injectable } from "@decorators/di/lib";
import { ErrorMiddleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ServerErrorMiddleware implements ErrorMiddleware {
  use(error: any, request: Request, response: Response, next: NextFunction): Response {
    console.error("🔥 ERROR DETECTADO:", error); // 👈 Agrega esta línea

    const httpStatus = error.status || 500;
    return response.status(httpStatus).send({
      status: httpStatus,
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

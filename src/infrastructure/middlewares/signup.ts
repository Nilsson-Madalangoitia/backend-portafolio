import { Injectable } from "@decorators/di";
import { Middleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

@Injectable()
export class SignUpMiddleware implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("signup", { session: false })(req, res, next);
  }
}
import { Injectable } from "@decorators/di";
import { Middleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

@Injectable()
export class JwtMiddleware implements Middleware{
    use(req: Request, res: Response, next: NextFunction): void{
        passport.authenticate("jwt", { session:false })(req, res, next);
    }
}
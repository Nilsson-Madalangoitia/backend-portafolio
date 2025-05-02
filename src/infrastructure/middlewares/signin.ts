import { Injectable } from "@decorators/di";
import { Middleware } from "@decorators/express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "@infrastructure/config";

@Injectable()
export class SignInMiddleware implements Middleware {
  use(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          return next(new Error("Credenciales inválidas"));
        }

        req.login(user, { session: false }, async (err) => {
          if (err) return next(err);

          const userPayload = {
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            rol: user.rol,
          };

          const token = jwt.sign({ user: userPayload }, config.JWT_SECRET, {
            expiresIn: "3h",
          });

          // 👉 Pasamos el token y usuario al controlador
          req.user = {
            token,
            user: userPayload,
          };

          next(); // 🔥 continúa al controlador
        });
      } catch (e) {
        next(e);
      }
    })(req, res, next);
  }
}

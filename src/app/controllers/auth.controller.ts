import { Controller, Get, Post, Request, Response } from "@decorators/express";
import {
  JwtMiddleware,
  SignInMiddleware,
  SignUpMiddleware,
} from "@infrastructure/middlewares";
import { Request as IRequest, Response as IResponse } from "express";

@Controller("/auth")
export class AuthController {
  constructor() {}

  @Post("/signup", [SignUpMiddleware])
  signUp(@Request() req: IRequest, @Response() res: IResponse) {
    res.json({ success: true, user: req.user });
  }

  @Post("/login", [SignInMiddleware])
  signIn(@Request() req: IRequest, @Response() res: IResponse) {
    const anyReq = req as any;
    const { token, user } = anyReq.user;

    res.json({
      success: true,
      message: "Login success",
      token,
      user,
    });
  }

  @Get("/profile", [JwtMiddleware])
  profile(@Request() req: IRequest, @Response() res: IResponse) {
    res.json({ success: true, user: req.user });
  }
}

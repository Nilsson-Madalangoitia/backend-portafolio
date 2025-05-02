import {
  CREATE_USER_USE_CASE,
  GET_ALL_USER_USE_CASE,
  GET_USER_USE_CASE,
  DELETE_USER_USE_CASE,
  UPDATE_USER_USE_CASE,
} from "@container/container";
import { UserDto } from "@core/dtos/user.dto";
import {
  CreateUserUseCase,
  GetAllUserUseCase,
  DeleteUserUseCase,
  UpdateUserUseCase,
  GetUserUseCase
} from "@core/use-case";
import { Inject } from "@decorators/di";
import {
  Body,
  Controller,
  Get,
  Delete,
  Params,
  Post,
  Put,
  Request,
  Response,
} from "@decorators/express";
import { ReqWithUser } from "@infrastructure/helpers/req-with-user";
import {
  JwtMiddleware,
  ValidateUserMiddleware,
} from "@infrastructure/middlewares";
import { plainToClass } from "class-transformer";
import { Request as IRequest, Response as IResponse } from "express";

@Controller("/user")
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(GET_ALL_USER_USE_CASE)
    private readonly getAllUserUseCase: GetAllUserUseCase,
    @Inject(GET_USER_USE_CASE)
    private readonly getUserUseCase: GetUserUseCase,
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post("", [JwtMiddleware, ValidateUserMiddleware])
  async create(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Body() body
  ) {
    const item = await this.createUserUseCase.execute({
      ...body,
      user: (req.user as ReqWithUser).id,
    });
    res.status(200).json({ success: true, data: item });
  }

  @Get("", [JwtMiddleware])
  async getAll(@Request() req: IRequest, @Response() res: IResponse) {
    const item = await this.getAllUserUseCase.execute();
    res.status(200).send({ success: true, data: item });
  }

  @Put("/:id", [JwtMiddleware, ValidateUserMiddleware])
  async update(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const data = plainToClass(UserDto, req.body);
    const item = await this.updateUserUseCase.execute({ id, data });
    res.json({ success: true, data: item });
  }

  @Get("/:id", [JwtMiddleware])
  async get(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const project = await this.getUserUseCase.execute(id);
    res.json({ success: true, data: project });
  }

  @Delete("/:id", [JwtMiddleware])
  async delete(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const message = await this.deleteUserUseCase.execute(id);
    res.status(200).send({ success: true, data: message });
  }
}
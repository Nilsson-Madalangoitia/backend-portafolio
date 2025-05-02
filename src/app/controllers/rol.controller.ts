import {
    CREATE_ROL_USE_CASE,
    GET_ALL_ROL_USE_CASE,
    GET_ROL_USE_CASE,
    DELETE_ROL_USE_CASE,
    UPDATE_ROL_USE_CASE,
  } from "@container/container";
  import { RolDto } from "@core/dtos/Rol.dto";
  import {
    CreateRolUseCase,
    DeleteRolUseCase,
    GetAllRolUseCase,
    GetRolUseCase,
    UpdateRolUseCase
  } from "@core/use-case";
  import { ReqWithUser } from "@infrastructure/helpers/req-with-user";
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
  import {
    JwtMiddleware,
    ValidateRolMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/rol")
  export class RolController {
    constructor(
      @Inject(CREATE_ROL_USE_CASE)
      private readonly createRolUseCase: CreateRolUseCase,
      @Inject(GET_ALL_ROL_USE_CASE)
      private readonly getAllRolUseCase: GetAllRolUseCase,
      @Inject(GET_ROL_USE_CASE)
      private readonly getRolUseCase: GetRolUseCase,
      @Inject(UPDATE_ROL_USE_CASE)
      private readonly updateRolUseCase: UpdateRolUseCase,
      @Inject(DELETE_ROL_USE_CASE)
      private readonly deleteRolUseCase: DeleteRolUseCase
    ) {}
  
    @Post("", [ValidateRolMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createRolUseCase.execute({
        ...body
      });
      res.status(201).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllRolUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const project = await this.getRolUseCase.execute(id);
      res.json({ success: true, data: project });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateRolMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(RolDto, req.body);
      const item = await this.updateRolUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteRolUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  
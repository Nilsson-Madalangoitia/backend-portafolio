import {
    CREATE_PORTAFOLIO_USE_CASE,
    GET_ALL_PORTAFOLIO_USE_CASE,
    GET_PORTAFOLIO_USE_CASE,
    DELETE_PORTAFOLIO_USE_CASE,
    UPDATE_PORTAFOLIO_USE_CASE,
    GET_PORTAFOLIO_BY_USER_USE_CASE
  } from "@container/container";
  import { PortafolioDto } from "../../core/dtos/portafolio.dto";
  import {
    CreatePortafolioUseCase,
    DeletePortafolioUseCase,
    GetAllPortafolioUseCase,
    GetPortafolioUseCase,
    UpdatePortafolioUseCase,
    GetPortafolioByUserUseCase
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
    ValidatePortafolioMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/portafolio")
  export class PortafolioController {
    constructor(
      @Inject(CREATE_PORTAFOLIO_USE_CASE)
      private readonly createPortafolioUseCase: CreatePortafolioUseCase,
      @Inject(GET_ALL_PORTAFOLIO_USE_CASE)
      private readonly getAllPortafolioUseCase: GetAllPortafolioUseCase,
      @Inject(GET_PORTAFOLIO_USE_CASE)
      private readonly getPortafolioUseCase: GetPortafolioUseCase,
      @Inject(UPDATE_PORTAFOLIO_USE_CASE)
      private readonly updatePortafolioUseCase: UpdatePortafolioUseCase,
      @Inject(DELETE_PORTAFOLIO_USE_CASE)
      private readonly deletePortafolioUseCase: DeletePortafolioUseCase,
      @Inject(GET_PORTAFOLIO_BY_USER_USE_CASE)
      private readonly getPortafolioByUserUseCase: GetPortafolioByUserUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidatePortafolioMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    )   {  
      
      const item = await this.createPortafolioUseCase.execute({
        ...body
      });

      res.status(201).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllPortafolioUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const project = await this.getPortafolioUseCase.execute(id);
      res.json({ success: true, data: project });
    }
  
    @Put("/:id", [JwtMiddleware, ValidatePortafolioMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(PortafolioDto, req.body);
      const item = await this.updatePortafolioUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deletePortafolioUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }

    @Get("/user/:userid", [JwtMiddleware])
    async getPortafolioByUser(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("userid") userid: string | number
    ) {
      const project = await this.getPortafolioByUserUseCase.execute(userid);
      res.json({ success: true, data: project });
    }
  
  }
  
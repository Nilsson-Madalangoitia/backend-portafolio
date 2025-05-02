import {
  CREATE_ANIO_USE_CASE,
  GET_ALL_ANIO_USE_CASE,
  GET_ANIO_USE_CASE,
  DELETE_ANIO_USE_CASE,
  UPDATE_ANIO_USE_CASE,
} from "@container/container";
import { AnioDto } from "@core/dtos/Anio.dto";
import {
  CreateAnioUseCase,
  DeleteAnioUseCase,
  GetAllAnioUseCase,
  GetAnioUseCase,
  UpdateAnioUseCase
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
  ValidateAnioMiddleware,
} from "@infrastructure/middlewares";
import { plainToClass } from "class-transformer";
import { Request as IRequest, Response as IResponse } from "express";

@Controller("/anio")
export class AnioController {
  constructor(
    @Inject(CREATE_ANIO_USE_CASE)
    private readonly createAnioUseCase: CreateAnioUseCase,
    @Inject(GET_ALL_ANIO_USE_CASE)
    private readonly getAllAnioUseCase: GetAllAnioUseCase,
    @Inject(GET_ANIO_USE_CASE)
    private readonly getAnioUseCase: GetAnioUseCase,
    @Inject(UPDATE_ANIO_USE_CASE)
    private readonly updateAnioUseCase: UpdateAnioUseCase,
    @Inject(DELETE_ANIO_USE_CASE)
    private readonly deleteAnioUseCase: DeleteAnioUseCase
  ) {}

  @Post("", [JwtMiddleware, ValidateAnioMiddleware])
  async create(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Body() body
  ) {
    const item = await this.createAnioUseCase.execute({
      ...body
    });
    res.status(200).json({ success: true, data: item });
  }

  @Get("", [JwtMiddleware])
  async getAll(@Request() req: IRequest, @Response() res: IResponse) {
    const item = await this.getAllAnioUseCase.execute();
    res.status(200).send({ success: true, data: item });
  }

  @Get("/:id", [JwtMiddleware])
  async get(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const project = await this.getAnioUseCase.execute(id);
    res.json({ success: true, data: project });
  }

  @Put("/:id", [JwtMiddleware, ValidateAnioMiddleware])
  async update(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const data = plainToClass(AnioDto, req.body);
    const item = await this.updateAnioUseCase.execute({ id, data });
    res.json({ success: true, data: item });
  }

  @Delete("/:id", [JwtMiddleware])
  async delete(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const message = await this.deleteAnioUseCase.execute(id);
    res.status(200).send({ success: true, data: message });
  }

}
  
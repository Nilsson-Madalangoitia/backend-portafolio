import {
  CREATE_ARCHIVO_USE_CASE,
  GET_ALL_ARCHIVO_USE_CASE,
  GET_ARCHIVO_USE_CASE,
  DELETE_ARCHIVO_USE_CASE,
  UPDATE_ARCHIVO_USE_CASE
} from "@container/container";
import {
  CreateArchivoUseCase,
  DeleteArchivoUseCase,
  GetAllArchivoUseCase,
  GetArchivoUseCase,
  UpdateArchivoUseCase
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
import {
  JwtMiddleware,
  ValidateArchivoMiddleware
} from "@infrastructure/middlewares";
import { plainToClass } from "class-transformer";
import { Request as IRequest, Response as IResponse } from "express";
import { uploadMiddleware, attachFileToBody } from '@infrastructure/helpers/multer-config'
import { ArchivoDto } from "@core/dtos/archivo.dto";
import { processPdfFromItem } from '../../infrastructure/helpers/processPdfFromItem';
import { searchInPinecone } from '../../infrastructure/helpers/searchInPinecone';
  
@Controller("/archivo")
export class ArchivoController {
  constructor(
    @Inject(CREATE_ARCHIVO_USE_CASE)
    private readonly createArchivoUseCase: CreateArchivoUseCase,
    @Inject(GET_ALL_ARCHIVO_USE_CASE)
    private readonly getAllArchivoUseCase: GetAllArchivoUseCase,
    @Inject(GET_ARCHIVO_USE_CASE)
    private readonly getArchivoUseCase: GetArchivoUseCase,
    @Inject(UPDATE_ARCHIVO_USE_CASE)
    private readonly updateArchivoUseCase: UpdateArchivoUseCase,
    @Inject(DELETE_ARCHIVO_USE_CASE)
    private readonly deleteArchivoUseCase: DeleteArchivoUseCase
  ) {}

  @Post("", [JwtMiddleware, ValidateArchivoMiddleware, uploadMiddleware, attachFileToBody])
  async create(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Body() body
  ) {
    const item = await this.createArchivoUseCase.execute({
      ...body
    });
    res.status(200).json({ success: true, data: item });
  }

  @Get("", [JwtMiddleware])
  async getAll(@Request() req: IRequest, @Response() res: IResponse) {
    const item = await this.getAllArchivoUseCase.execute();
    
    //Procesa el PDF y lo sube a Pinecone (fragmentos)
    const result = await processPdfFromItem(item[0].file);

    let searchResults = [];
    var question = "¿Cuál es la diferencia entre IPv4 e IPv6?";
    // Si viene pregunta, hacemos la búsqueda
    if (question) {
      searchResults = await searchInPinecone(question, item[0].id);
    }
    console.log(searchResults)

    res.status(200).send({ success: true, data: item });
  }

  @Get("/:id", [JwtMiddleware])
  async get(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const item = await this.getArchivoUseCase.execute(id);
    res.json({ success: true, data: item });
  }

  @Put("/:id", [JwtMiddleware, ValidateArchivoMiddleware, uploadMiddleware, attachFileToBody])
  async update(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const data = plainToClass(ArchivoDto, req.body);
    const item = await this.updateArchivoUseCase.execute({ id, data });
    res.json({ success: true, data: item });
  }

  @Delete("/:id", [JwtMiddleware])
  async delete(
    @Request() req: IRequest,
    @Response() res: IResponse,
    @Params("id") id: string | number
  ) {
    const message = await this.deleteArchivoUseCase.execute(id);
    res.status(200).send({ success: true, data: message });
  }

}
  
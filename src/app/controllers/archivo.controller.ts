import {
  CREATE_ARCHIVO_USE_CASE,
  GET_ALL_ARCHIVO_USE_CASE,
  GET_ARCHIVO_USE_CASE,
  DELETE_ARCHIVO_USE_CASE,
  UPDATE_ARCHIVO_USE_CASE,
  GET_ARCHIVO_BY_USER_USE_CASE
} from "@container/container";
import {
  CreateArchivoUseCase,
  DeleteArchivoUseCase,
  GetAllArchivoUseCase,
  GetArchivoUseCase,
  UpdateArchivoUseCase,
  GetArchivoByUserUseCase
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
import { ArchivoDto } from "../../core/dtos/archivo.dto";
import { processPdfFromItem } from '../../infrastructure/helpers/processPdfFromItem';
import { searchInPinecone } from '../../infrastructure/helpers/searchInPinecone';
import { index } from "../../infrastructure/helpers/pinecone";
  
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
    private readonly deleteArchivoUseCase: DeleteArchivoUseCase,
    @Inject(GET_ARCHIVO_BY_USER_USE_CASE)
    private readonly getArchivoByUserUseCase: GetArchivoByUserUseCase
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

    if(item){
      const fileBuffer: Buffer = req.file.buffer
      const mimeType: string = req.file.mimetype;
      const result = await processPdfFromItem(item, fileBuffer, mimeType);
      console.log(result)
    }

    res.status(200).json({ success: true, data: item });

  }

  @Get("/consulta", [JwtMiddleware])
  async getConsult(
    @Request() req: IRequest,
    @Response() res: IResponse
  ) {

    let searchResults = [];
    var question: string = String(req.query.question);
    var userid: string = String(req.query.userid);

    // Si viene pregunta, hacemos la búsqueda
    if (question && userid) {
      searchResults = await searchInPinecone(question, userid);
    }

    res.status(200).send({ success: true, data: searchResults });

  }

  @Delete("/fragmentos", [JwtMiddleware])
  async deleteAllFragments(
    @Request() req: IRequest,
    @Response() res: IResponse
  ) {
    try {
      
      await index.namespace("").deleteAll();

      res.status(200).send({ success: true, message: "Todos los fragmentos eliminados de Pinecone." });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Error eliminando fragmentos." });
    }
  }

  @Get("", [JwtMiddleware])
  async getAll(@Request() req: IRequest, @Response() res: IResponse) {
    const item = await this.getAllArchivoUseCase.execute();
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

  @Get("/portafolio/:portafolioid/userid/:userid", [JwtMiddleware])
    async getArchivoByUser(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("portafolioid") portafolioid: string | number,
      @Params("userid") userid: string | number
    ) {
      const project = await this.getArchivoByUserUseCase.execute(portafolioid, userid);
      res.json({ success: true, data: project });
    }

}
  
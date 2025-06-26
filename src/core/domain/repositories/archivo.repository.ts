import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { Archivo, ArchivoDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class ArchivoRepository extends BaseRepository {
  archivo: Model<ArchivoDoc>;
  constructor() {
    super(Archivo);
    this.archivo = Archivo;
  }
}

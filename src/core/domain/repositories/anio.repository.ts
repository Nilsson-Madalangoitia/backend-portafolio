import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { Anio, AnioDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class AnioRepository extends BaseRepository {
  anio: Model<AnioDoc>;
  constructor() {
    super(Anio);
    this.anio = Anio;
  }
}

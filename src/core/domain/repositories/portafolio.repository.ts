import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { Portafolio, PortafolioDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class PortafolioRepository extends BaseRepository {
  portafolio: Model<PortafolioDoc>;
  constructor() {
    super(Portafolio);
    this.portafolio = Portafolio;
  }
}

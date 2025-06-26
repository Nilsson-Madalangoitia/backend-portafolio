import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { Rol, RolDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class RolRepository extends BaseRepository {
  rol: Model<RolDoc>;
  constructor() {
    super(Rol);
    this.rol = Rol;
  }
}

import mongoose from "mongoose";

export interface BaseOperations {
  get(id: string | number);
  getAll(pageSize?: number, pageNum?: number);
  create(entity);
  update(id: string | number, entity);
  delete(id: string | number);
}

export class BaseRepository implements BaseOperations {
  private model: mongoose.Model<any>;
  constructor(model) {
    this.model = model;
  }
  async get(id: string | number) {
    return await this.model.findById(id);
  }

  async getAll() {
    return await this.model.find({ status: true });
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id: string | number, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id: string | number) {
    await this.model.findByIdAndDelete(id);
    return true;
  }

  async getPortafolioByUser(userid: string | number) {
    return await this.model.find({ profesores: userid, status: true });
  }

  async getArchivoByUser(portafolioid, userid: string | number) {
    return await this.model.find({ portafolio: portafolioid, creadoPor: userid, status: true });
  }

  async getArchivoByCategoria(semanaid: string, categoriaid: string, portafolioid: string) {
    return await this.model.find({ semana: semanaid, categoria: categoriaid, portafolio: portafolioid, status: true });
  }

}

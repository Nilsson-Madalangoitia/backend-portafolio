import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { UserDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface PortafolioAttrs {
  nombre: string;
  descripcion: string;
  anio: string;
  profesores: string[];
  status: boolean;
}

export interface PortafolioDoc extends mongoose.Document {
  nombre: string;
  descripcion: string;
  anio: string;
  profesores: string[];
  status: boolean;
}

interface PortafolioModel extends mongoose.Model<PortafolioDoc> {
  build(attrs: PortafolioAttrs): PortafolioDoc;
}

const portafolioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido."],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es requerido."],
    },
    anio: {
      type: String,
      required: [true, "El año es requerido."],
    },
    profesores: [
      {
        type: String
      }
    ],
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.profesores = ret.profesores?.map((prof: any) => prof._id?.toString?.() || prof.toString());
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

portafolioSchema.plugin(mongoose_autopopulate);
portafolioSchema.plugin(uniqueValidator, { message: "The portafolio already exists." });
export const Portafolio = mongoose.model<PortafolioDoc, PortafolioModel>("portafolio", portafolioSchema);

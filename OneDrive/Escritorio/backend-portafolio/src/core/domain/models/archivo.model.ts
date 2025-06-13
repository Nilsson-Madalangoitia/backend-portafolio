import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";
import { PortafolioDoc } from '@core/domain/models';
import { UserDoc } from '@core/domain/models';

const { Schema } = mongoose;

interface ArchivoAttrs {
  nombre: string;
  tipo: string;
  url: string;
  semana: number;
  categoria: string;
  portafolio: PortafolioDoc;
  creadoPor: UserDoc;
  status: boolean;
}

export interface ArchivoDoc extends mongoose.Document {
    nombre: string;
    tipo: string;
    url: string;
    semana: number;
    categoria: string;
    portafolio: PortafolioDoc;
    creadoPor: UserDoc;
    status: boolean;
}

interface ArchivoModel extends mongoose.Model<ArchivoDoc> {
  build(attrs: ArchivoAttrs): ArchivoDoc;
}

const archivoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "The nombre is required."],
      unique: true
    },
    tipo: {
      type: String,
      required: [true, "The tipo is required."]
    },
    url: {
      type: String,
      required: [true, "La url del documento es requerido."]
    },
    semana: {
      type: Number,
      required: [true, "La semana es requerida."]
    },
    categoria: {
      type: String,
      required: [true, "La categoria es requerida."]
    },
    portafolio: {
      type: mongoose.Types.ObjectId,
      ref: "portafolio",
      autopopulate: true,
      required: [true, "El id del portafolio es requerido."]
    },
    creadoPor: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      autopopulate: true,
      required: [true, "El id del usuario es requerido."]
    },
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
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

archivoSchema.plugin(mongoose_autopopulate);
archivoSchema.plugin(uniqueValidator, { message: "The archivo already exists." });
export const Archivo = mongoose.model<ArchivoDoc, ArchivoModel>("archivo", archivoSchema);

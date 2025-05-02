import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

interface AnioAttrs {
  nombre: string;
  descripcion: string;
  status: boolean;
}

export interface AnioDoc extends mongoose.Document {
  nombre: string;
  descripcion: string;
  status: boolean;
}

interface AnioModel extends mongoose.Model<AnioDoc> {
  build(attrs: AnioAttrs): AnioDoc;
}

const anioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El año es requerido."],
      unique: true
    },
    descripcion: {
        type: String,
        required: false
      },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

anioSchema.plugin(mongoose_autopopulate);
anioSchema.plugin(uniqueValidator, { message: "Ya existe el año" });
export const Anio = mongoose.model<AnioDoc, AnioModel>("anio", anioSchema);

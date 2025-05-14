import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

interface ArchivoAttrs {
  nombre: string;
  tipo: string;
  file: Buffer;
  status: boolean;
}

export interface ArchivoDoc extends mongoose.Document {
    nombre: string;
    tipo: string;
    file: Buffer;
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
    file: {
      type: Buffer,
      required: [true, "El documento es requerido."]
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

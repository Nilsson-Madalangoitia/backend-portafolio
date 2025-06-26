import mongoose from "mongoose";
import mongoose_autopopulate from "mongoose-autopopulate";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

interface RolAttrs {
  nombre: string;
  status: boolean;
}

export interface RolDoc extends mongoose.Document {
  nombre: string;
  status: boolean;
}

interface RolModel extends mongoose.Model<RolDoc> {
  build(attrs: RolAttrs): RolDoc;
}

const rolSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "The name is required."],
      unique: true
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

rolSchema.plugin(mongoose_autopopulate);
rolSchema.plugin(uniqueValidator, { message: "The role already exists." });
export const Rol = mongoose.model<RolDoc, RolModel>("rol", rolSchema);

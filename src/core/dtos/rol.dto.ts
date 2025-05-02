import { IsString } from "class-validator";

export class RolDto {

  @IsString({ message: "El $property debe ser un texto" })
  nombre: string;

}

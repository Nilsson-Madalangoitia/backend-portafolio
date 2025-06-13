import { IsString } from "class-validator";

export class PortafolioDto {

  @IsString({ message: "El $property debe ser un texto" })
  nombre: string;

  @IsString({ message: "El $property debe ser un texto" })
  descripcion: string;

  @IsString({ message: "El $property debe ser un texto" })
  anio: string;

}

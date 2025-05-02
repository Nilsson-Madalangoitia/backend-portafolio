import { IsString } from "class-validator";

export class AnioDto {
    
  @IsString({ message: "El $property debe ser un texto" })
  nombre: string;

}
import { IsString } from "class-validator";

export class UserDto {
  @IsString({ message: "El $property debe ser un texto" })
  nombre: string;

  @IsString({ message: "El $property debe ser un texto" })
  apellido: string;
  
  @IsString({ message: "El $property debe ser un texto" })
  email: string;

  @IsString({ message: "El $property debe ser un texto" })
  password: string;

  @IsString({ message: "El $property debe ser un texto" })
  rol: string;
}

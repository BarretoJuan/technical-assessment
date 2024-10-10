import { IsString, Length, Max, MaxLength } from "class-validator";

export class CreateUserDto {

  @IsString(
    { message: 'El nombre de usuario debe ser una cadena de texto' }
  )
  @Length(4, 45, {
    message: 'El nombre de usuario debe tener entre 4 y 45 caracteres',
  }
  )
  username: string;

  @IsString(
    { message: 'La contraseña debe ser una cadena de texto' }
  )
  @MaxLength(255, {
    message: 'La contraseña no puede tener más de 255 caracteres',
  }
  )
  password: string;
}

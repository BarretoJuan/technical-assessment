import { IsString, Length } from "class-validator";

export class FindUserDto {

  @IsString()
  @Length(4, 45, {
    message: 'El nombre de usuario debe tener entre 4 y 45 caracteres',
  })
  username: string;
}

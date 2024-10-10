import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
  maxLength,
} from 'class-validator';

export class CreateTaskDto {
  @Length(4, 45, {
    message: 'El título debe tener entre 4 y 45 caracterssdsdces',
  })
  @IsString({
    message: 'El título debe ser un texto',
  })
  title: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un texto',
  })
  @MaxLength(500, {
    message: 'La descripción no puede tener más de 500 caracteres',
  })
  description: string;
}

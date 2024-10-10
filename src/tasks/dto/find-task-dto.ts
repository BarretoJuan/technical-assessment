import { IsString } from "class-validator";

export class FindTaskDto {

  @IsString()
  id: string;
}

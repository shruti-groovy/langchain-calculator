import { IsNotEmpty, IsString } from "class-validator";

export class CalculateDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}

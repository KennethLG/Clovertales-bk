import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
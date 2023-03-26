import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  order: number;
}
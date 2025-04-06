import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogImageDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

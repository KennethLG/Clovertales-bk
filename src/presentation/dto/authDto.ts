import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
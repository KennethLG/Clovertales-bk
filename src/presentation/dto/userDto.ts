import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;
}
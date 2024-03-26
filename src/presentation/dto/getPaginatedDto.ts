import { Expose } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class GetPaginatedDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Expose()
  createdAt: string;
}

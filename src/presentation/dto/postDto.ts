import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsDateString, IsBoolean } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string = "default";

  @IsString()
  @IsNotEmpty()
  @Expose()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  imageUrl: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  imageUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  available: boolean;
}

export class GetPostsDto {
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

import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { BadRequestError } from "./customError";

export async function extractAndValidate<T extends object>(
  dtoClass: new () => T,
  data: any
): Promise<T> {
  console.log("1", data)

  if (!data) {
    throw new BadRequestError("Please provide a body");
  }

  const dto = plainToClass(dtoClass, data, {
    excludeExtraneousValues: true,
  });
  console.log("2", dto)
  await validateOrReject(dto, {
    validationError: {
      target: false,
    },
  });
  return dto;
}

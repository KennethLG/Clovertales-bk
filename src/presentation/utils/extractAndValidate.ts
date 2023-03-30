import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { BadRequestError } from "./customError";

export async function extractAndValidate<T extends object>(
  dtoClass: new () => T,
  data: any
): Promise<T> {

  if (!data) {
    throw new BadRequestError("Please provide a body");
  }

  const dto = plainToClass(dtoClass, data, {
    excludeExtraneousValues: true,
  });
  await validateOrReject(dto, {
    validationError: {
      target: false,
    },
  });
  return dto;
}

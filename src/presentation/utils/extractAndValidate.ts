import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

export async function extractAndValidate<T extends object>(
  dtoClass: new () => T,
  data: any
): Promise<T> {
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

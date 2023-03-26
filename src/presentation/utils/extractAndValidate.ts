import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

export async function extractAndValidate<T extends object>(
  dtoClass: new () => T,
  data: any
): Promise<T> {
  console.log(dtoClass, data);
  const dto = plainToClass(dtoClass, data, {
    excludeExtraneousValues: true,
  });
  console.log(dto);
  await validateOrReject(dto, {
    validationError: {
      target: false,
    },
  });
  return dto;
}

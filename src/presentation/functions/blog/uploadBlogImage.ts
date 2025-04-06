import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { CreateBlogImageDto } from "src/presentation/dto/blogDto";
import { errorHandlerMiddleware } from "src/presentation/middleware/errorHandler";
import { extractAndValidate } from "src/presentation/utils/extractAndValidate";
import { ResponseHandler } from "src/presentation/utils/responses";
import { createUploadBlogImageUseCaseFactory } from "./blogFactory";

const handlerFunction: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body as string);
  const { image, name } = await extractAndValidate(CreateBlogImageDto, body);

  const uploadBlogImage = createUploadBlogImageUseCaseFactory();
  await uploadBlogImage.execute(image, name);

  return new ResponseHandler().success();
};

export const handler = errorHandlerMiddleware(handlerFunction);

import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { CreatePostDto } from "./createPostDto";
import { createPostDependencies } from "./postDependenciesFactory";

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const createPostDto = JSON.parse(event.body as string) as CreatePostDto;

  try {

    const { createPost } = createPostDependencies();

    const newPost = await createPost.execute(createPostDto);

    return {
      statusCode: 200,
      body: JSON.stringify(newPost),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
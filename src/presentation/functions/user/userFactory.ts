import { UserService } from "src/infrastructure/services/userService";
import CreateUser from "src/useCases/user/createUser";
import { DynamoDbUserClient } from "src/infrastructure/database/dynamodbUser";
import UserRepositoryImpl from "src/infrastructure/repositories/userRepository";

export const createUserUseCaseFactory = () => {
  const dbClient = new DynamoDbUserClient();
  const userRepository = new UserRepositoryImpl(dbClient);
  const userService = new UserService(userRepository);
  const createUser = new CreateUser(userService);
  return createUser;
};

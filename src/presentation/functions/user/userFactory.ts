import CreateUser from "src/useCases/user/createUser";
import { DynamoDbUserClient } from "src/infrastructure/database/dynamodbUser";
import UserRepositoryImpl from "src/infrastructure/repositories/userRepository";
import { UUIDService } from "src/infrastructure/services/uuidService";

export const createUserUseCaseFactory = () => {
  const dbClient = new DynamoDbUserClient();
  const uuidService = new UUIDService();
  const userRepository = new UserRepositoryImpl(dbClient);
  const createUser = new CreateUser(userRepository, uuidService);
  return createUser;
};

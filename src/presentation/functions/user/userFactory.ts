import { UserService } from "src/app/services/userService";
import { User } from "src/domain/entities/user";
import CreateUser from "src/domain/useCases/user/createUser";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import UserRepositoryImpl from "src/infrastructure/repositories/userRepository";

export const createUserUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<User>("UsersTable");
  const userRepository = new UserRepositoryImpl(dbClient);
  const userService = new UserService(userRepository);
  const createUser = new CreateUser(userService);
  return createUser;
}
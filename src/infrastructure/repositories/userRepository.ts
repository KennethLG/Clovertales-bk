import { User } from "src/domain/entities/user";
import { DbClient, IUserRepository } from "src/domain/repositories/dbClient";
import { DynamoDbClient } from "../database/dynamodb";

export default class UserRepositoryImpl
  extends DynamoDbClient<User>
  implements IUserRepository
{
  private dbClient: DbClient<User>;
  constructor(db: DbClient<User>) {
    super("UserTable");
    this.dbClient = db;
  }

  async create(user: User) {
    return await this.dbClient.create(user);
  }

  async getByEmail(email: string) {
    return await this.dbClient.get(email);
  }
}

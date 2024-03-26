import { User } from "src/domain/entities/user";
import { DbClientWrapper } from "../common/dbClientWrapper";
import UserRepository from "src/domain/repositories/userRepository";

export default class UserRepositoryImpl
  extends DbClientWrapper<User>
  implements UserRepository
{
  constructor(protected dbClient: UserRepository) {
    super(dbClient);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.dbClient.getByEmail(email);
  }
}
import { User } from "src/domain/entities/user";
import { IUserRepository } from "src/domain/repositories/dbClient";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class UserRepositoryImpl
  extends DbClientWrapper<User>
  implements IUserRepository
{
  constructor(protected dbClient: IUserRepository) {
    super(dbClient);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.dbClient.getByEmail(email);
  }
}
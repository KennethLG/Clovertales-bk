import { User } from "src/domain/entities/user";
import DbClient from "src/domain/repositories/dbClient";
import UserRepository from "src/domain/repositories/userRepository";

export default class UserRepositoryImpl implements UserRepository {
  private dbClient: DbClient<User>;
  constructor(db: DbClient<User>) {
    this.dbClient = db;
  }

  async create(user: User) {
    return await this.dbClient.create(user);
  }
}
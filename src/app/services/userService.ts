import { User } from "src/domain/entities/user";
import UserRepository from "src/domain/repositories/userRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    return await this.userRepository.create(user);
  }
}
import { User } from "src/domain/entities/user";
import UserRepository from "src/domain/repositories/userRepository";
import { UUIDService } from "src/infrastructure/services/uuidService";

export default class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uuidService: UUIDService
  ) {}

  async execute(email: string) {
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      return;
    }

    const newUser = new User();
    newUser.id = this.uuidService.generateId();
    newUser.createdAt = new Date().toISOString();
    newUser.email = email;

    return await this.userRepository.create(newUser);
  }
}

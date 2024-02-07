import { User } from "src/domain/entities/user";
import UserRepository from "src/domain/repositories/userRepository";
import { CreateUserDto } from "src/presentation/dto/userDto";
import { v4 as uuidv4 } from "uuid";

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDto: CreateUserDto) {
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    if (existingUser) {
      return;
    }

    const newUser = new User();
    newUser.id = uuidv4();
    newUser.createdAt = new Date().toISOString();
    newUser.email = userDto.email;

    return await this.userRepository.create(newUser);
  }
}

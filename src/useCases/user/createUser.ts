import { UserService } from "src/infrastructure/services/userService";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "src/presentation/dto/userDto";
import { v4 as uuidv4 } from "uuid";

export default class CreateUser {
  constructor(private readonly userService: UserService) {}

  async execute(userDto: CreateUserDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      return;
    }

    const newUser = new User();
    newUser.id = uuidv4();
    newUser.createdAt = new Date().toISOString();
    newUser.email = userDto.email;

    return await this.userService.create(newUser);
  }
}

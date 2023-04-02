import { UserService } from "src/app/services/userService";
import { User } from "src/domain/entities/user";
import { UserDto } from "src/presentation/dto/userDto";
import { v4 as uuidv4 } from "uuid";

export default class CreateUser {
  constructor(private readonly userService: UserService) {}

  async execute(userDto: UserDto) {

    const newUser = new User();
    newUser.id = uuidv4();
    newUser.createdAt = new Date().toISOString();
    newUser.email = userDto.email;

    return await this.userService.create(newUser);
  }
}
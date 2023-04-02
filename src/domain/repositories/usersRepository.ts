import { User } from "../entities/user";

export default interface UsersRepository {
  create: (user: User) => Promise<User>;
}
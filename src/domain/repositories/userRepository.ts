import { User } from "../entities/user";

export default interface UserRepository {
  create: (user: User) => Promise<User>;
  getByEmail: (email: string) => Promise<User>;
}
import { User } from "../entities/user";
import { DbClient } from "./dbClient";

export default abstract class UserRepository extends DbClient<User> {
  abstract getByEmail(email: string): Promise<User | undefined>;
}
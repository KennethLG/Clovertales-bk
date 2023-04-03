import { Platform } from "src/domain/entities/platform";
import { DbClient } from "src/domain/repositories/dbClient";
import PlatformRepository from "src/domain/repositories/platformRepository";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class PlatformRepositoryImpl
  extends DbClientWrapper<Platform>
  implements PlatformRepository
{
  constructor(db: DbClient<Platform>) {
    super(db);
  }
}

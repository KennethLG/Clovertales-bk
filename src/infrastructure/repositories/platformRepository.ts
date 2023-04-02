import { Platform } from "src/domain/entities/platform";
import { DbClient } from "src/domain/repositories/dbClient";
import PlatformRepository from "src/domain/repositories/platformRepository";

export default class PlatformRepositoryImpl implements PlatformRepository {
  private dbClient: DbClient<Platform>;
  constructor(db: DbClient<Platform>) {
    this.dbClient = db;
  }
  async getAll() {
    const platforms = await this.dbClient.getAll();
    return platforms;
  }
}

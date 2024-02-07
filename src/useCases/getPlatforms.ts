import { Platform } from "../domain/entities/platform";
import PlatformRepository from "src/domain/repositories/platformRepository";

export default class GetPlatforms {
  constructor(private readonly platformRepository: PlatformRepository) {}

  async getAll(): Promise<Platform[]> {
    const platforms = await this.platformRepository.getAll();
    return platforms;
  }
}

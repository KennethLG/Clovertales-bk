import { Platform } from "src/domain/entities/platform";
import platFormRepository from "src/domain/repositories/platformRepository";

export default class PlatformService {
  constructor(private readonly platformRepository: platFormRepository) {}

  async getAll(): Promise<Platform[]> {
    const platforms = await this.platformRepository.getAll();
    return platforms;
  }
}

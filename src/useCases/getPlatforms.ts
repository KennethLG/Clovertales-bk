import PlatformService from "src/infrastructure/services/platformService";
import { Platform } from "../domain/entities/platform";

export default class GetPlatforms {
  constructor(private readonly platformService: PlatformService) {}

  async getAll(): Promise<Platform[]> {
    const platforms = await this.platformService.getAll();
    return platforms;
  }
}

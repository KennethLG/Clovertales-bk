import { Platform } from "../entities/platform";

export default interface PlatformRepository {
  getAll: () => Promise<Platform[]>;
}

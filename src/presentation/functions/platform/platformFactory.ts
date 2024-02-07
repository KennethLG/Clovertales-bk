import { Platform } from "src/domain/entities/platform";
import GetPlatforms from "src/useCases/getPlatforms";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import PlatformRepositoryImpl from "src/infrastructure/repositories/platformRepository";

export const getPlatformsUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Platform>("PlatformsTable");
  const platformRepository = new PlatformRepositoryImpl(dbClient);
  const getPlatforms = new GetPlatforms(platformRepository);
  return getPlatforms;
};

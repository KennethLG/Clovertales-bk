import PlatformService from "src/app/services/platformService";
import { Platform } from "src/domain/entities/platform";
import GetPlatforms from "src/domain/useCases/getPlatforms"
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import PlatformRepositoryImpl from "src/infrastructure/repositories/platformRepository";

export const getPlatformsUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Platform>("PlatformsTable");
  const platformRepository = new PlatformRepositoryImpl(dbClient);
  const platformService = new PlatformService(platformRepository);
  const getPlatforms = new GetPlatforms(platformService);
  return getPlatforms;
}
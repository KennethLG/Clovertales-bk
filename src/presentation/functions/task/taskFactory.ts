import { Task } from "src/domain/entities/task"
import { DbClient } from "src/domain/repositories/dbClient"
import { DynamoDbClient } from "src/infrastructure/database/dynamodb"
import TaskRepositoryImpl from "src/infrastructure/repositories/taskRepository"
import { TrelloService } from "src/infrastructure/services/trelloService"
import CreateTask from "src/useCases/task/createTask"
import GetTasksPaginated from "src/useCases/task/getTasksPaginated"

const db = new DynamoDbClient<Task>("TasksTable");
const repository = new TaskRepositoryImpl(db);

export const createTaskUseCaseFactory = () => {

  const service = new TrelloService()
  const createTask = new CreateTask(repository, service);
  return createTask;
}

export const getTasksPaginatedUseCaseFactory = () => {
  const getTasksPaginated = new GetTasksPaginated(repository);
  return getTasksPaginated;
}
import { Task } from "src/domain/entities/task"
import { DbClient } from "src/domain/repositories/dbClient"
import { DynamoDbClient } from "src/infrastructure/database/dynamodb"
import TaskRepositoryImpl from "src/infrastructure/repositories/taskRepository"
import CreateTask from "src/useCases/task/createTask"

export const createTaskUseCaseFactory = () => {
  const db = new DynamoDbClient<Task>("TasksTable");
  const repository = new TaskRepositoryImpl(db);
  const createTask = new CreateTask(repository);
  return createTask;
}
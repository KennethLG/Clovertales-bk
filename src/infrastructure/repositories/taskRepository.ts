import { Task } from "src/domain/entities/task";
import { DbClientWrapper } from "../common/dbClientWrapper";
import TaskRepository from "src/domain/repositories/taskRepository";
import { DbClient } from "src/domain/repositories/dbClient";

export default class TaskRepositoryImpl
  extends DbClientWrapper<Task>
  implements TaskRepository
{
  constructor(db: DbClient<Task>) {
    super(db);
  }
}

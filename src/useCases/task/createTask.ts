import { Task, TaskCreateAttributes } from "src/domain/entities/task";
import TaskRepository from "src/domain/repositories/taskRepository";

export default class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async exec(task: TaskCreateAttributes) {
    const newTask = Task.create(task);
    return await this.taskRepository.create(newTask);
  }
}
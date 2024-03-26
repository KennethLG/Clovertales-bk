import { Task, TaskCreateAttributes } from "src/domain/entities/task";
import TaskRepository from "src/domain/repositories/taskRepository";
import { TrelloService } from "src/infrastructure/services/trelloService";

export default class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly trelloService: TrelloService
  ) {}

  async exec(task: TaskCreateAttributes) {
    const trelloTask = await this.getTaskDescription(task.id)
    const newTask = Task.create(task);
    newTask.description = trelloTask?.desc;
    return await this.taskRepository.create(newTask);
  }

  private async getTaskDescription(id: string) {
    const response = await this.trelloService.getCard(id);
    if (response) {
      return response;
    }
  }
}
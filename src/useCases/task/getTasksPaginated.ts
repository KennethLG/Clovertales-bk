import TaskRepository from "src/domain/repositories/taskRepository";

export default class GetTasksPaginated {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(limit: number, startKey?: { id: string; createdAt: string }) {
    const posts = await this.taskRepository.getAllPaginated("TASK", limit, startKey);
    return posts;
  }
}
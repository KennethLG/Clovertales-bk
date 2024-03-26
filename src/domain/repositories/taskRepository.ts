import { Task } from "../entities/task";

export default interface TaskRepository {
  create: (task: Task) => Promise<Task>;
  getAllPaginated(
    id: string,
    limit?: number,
    startKey?: { id: string; createdAt: string }
  ): Promise<{
    items: Task[];
    lastEvaluatedKey?: { id: string; createdAt: string };
  }>;
}
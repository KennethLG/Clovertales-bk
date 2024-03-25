import { Task } from "../entities/task";

export default interface TaskRepository {
  create: (task: Task) => Promise<Task>; 
}
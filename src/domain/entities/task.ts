export type TaskCreateAttributes = Pick<Task, "title" | "description" | "id">

export class Task {
  id: string;
  createdAt: string;
  title: string;
  description?: string;

  static create(task: TaskCreateAttributes) {
    const newTask = new Task();
    newTask.createdAt = new Date().toISOString();
    newTask.id = "TASK";
    newTask.title = task.title;
    newTask.description = task.description;
    return newTask;
  }
}
export type TaskCreateAttributes = Pick<Task, "title" | "description" | "id">

type Attachment = {
  id: string;
  url: string;
}

export class Task {
  id: string;
  createdAt: string;
  title: string;
  description?: string;
  attachments?: Attachment[]; // list of URLs

  static create(task: TaskCreateAttributes) {
    const newTask = new Task();
    newTask.createdAt = new Date().toISOString();
    newTask.id = "TASK";
    newTask.title = task.title;
    newTask.description = task.description;
    return newTask;
  }
}
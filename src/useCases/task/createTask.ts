import { Task, TaskCreateAttributes } from "src/domain/entities/task";
import TaskRepository from "src/domain/repositories/taskRepository";
import { ITrelloService, TrelloAttachment, TrelloCard } from "src/domain/services/trelloService";

export default class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly trelloService: ITrelloService
  ) {}

  async exec(task: TaskCreateAttributes) {

    const promises = [this.getTask(task.id), this.getTaskAttachments(task.id)];

    const [taskResult, attachmentsResult] = await Promise.allSettled(promises);

    let description;
    let attachments;

    if (taskResult.status === "fulfilled" && taskResult.value) {
      description = (taskResult.value as TrelloCard).desc;
      description = this.cleanDescription(description);
    } else {
      console.warn('No description found or failed to get task');
    }

    if (attachmentsResult.status === "fulfilled" && attachmentsResult.value) {
      const attachmentsValues = attachmentsResult.value as TrelloAttachment[];
      const extractedAttachments = this.extractAttachmentsData(attachmentsValues);
      attachments = extractedAttachments;
    } else {
      console.warn('No attachments found or failed to load attachments');
    }

    const newTask = Task.create(task);
    newTask.description = description;
    newTask.attachments = attachments;

    return await this.taskRepository.create(newTask);
  }

  private extractAttachmentsData(attachments: TrelloAttachment[]) {
    return attachments.map((attachment) => ({
      id: attachment.id,
      url: attachment.url
    }))
  }

  private cleanDescription(description: string) {
    const noMarkdownImages = description.replace(/!\[.*?\]\((.*?)\)/g, '');
    const cleanText = noMarkdownImages.replace(/https?:\/\/[^\s]+/g, '');
  
    return cleanText;
  }

  private async getTask(id: string) {
    const response = await this.trelloService.getCard(id);
    return response;
  }

  private async getTaskAttachments(id: string) {
    const response = await this.trelloService.getCardAttachments(id);
    return response;
  }
}
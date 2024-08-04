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
    let timing;
    let level;
    let type;
    
    if (taskResult.status === "fulfilled" && taskResult.value) {
      const trelloCard = (taskResult.value as TrelloCard);
      description = trelloCard.desc;
      timing = this.getTiming(description);
      const typeAndLevel = this.getTypeAndLevel(trelloCard.title);
      level = typeAndLevel.level;
      type = typeAndLevel.type;
      description = this.cleanDescription(description, timing, level, type);
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
    newTask.timing = timing;
    newTask.type = type;
    newTask.level = level;

    return await this.taskRepository.create(newTask);
  }

  private extractAttachmentsData(attachments: TrelloAttachment[]) {
    return attachments.map((attachment) => ({
      id: attachment.id,
      url: attachment.url
    }))
  }

  private getTypeAndLevel(title: string) {
    const prefixRegex = /^(FEATURE|ENHANCEMENT|BUG|ERROR|WARNING)(\([^\)]+\))?:\s*/;
    let type = 'Unspecified';
    let level = 'Unspecified';

    const match = title.match(prefixRegex);
    if (match) {
      type = match[1];
      if (match[2]) {
        level = match[2].slice(1, -1); // Remove the parentheses
        level = level.replace(/\d+$/, ''); // Remove trailing numbers
      }
    }

    return {
      type,
      level
    };
  }

  private cleanDescription(description: string, timing?: string, level?: string, type?: string) {
    let cleanText = '';
    const noMarkdownImages = description.replace(/!\[.*?\]\((.*?)\)/g, ''); // remove markdown images
    const noLinks = noMarkdownImages.replace(/https?:\/\/[^\s]+/g, ''); // remove links
    const noTiming = timing ? noLinks.replace(timing, '') : noLinks; // remove timing
    const noLevel = level ? noTiming.replace(level, '') : noTiming; // remove level
    const noType = type ? noLevel.replace(type, '') : noLevel; // no type
    cleanText = noType;
    return cleanText;
  }

  private getTiming(description: string) {
    const timingRegex = /\[\d+h\]/; // create timing regex
    const timingMatch = description.match(timingRegex); // extract timing 
    let timing = timingMatch ? timingMatch[0] : undefined; // Default to [1h] if no timing found
    return timing;
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
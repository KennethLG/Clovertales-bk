import { Task, TaskCreateAttributes } from "src/domain/entities/task";
import TaskRepository from "src/domain/repositories/taskRepository";
import {
  ITrelloService,
  TrelloAttachment,
  TrelloCard,
} from "src/domain/services/trelloService";

export default class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly trelloService: ITrelloService
  ) {}

  async exec(task: TaskCreateAttributes) {
    console.log("updating card, input:", task);

    const promises = [this.getTask(task.id), this.getTaskAttachments(task.id)];

    const [taskResult, attachmentsResult] = await Promise.allSettled(promises);

    console.log("task from trello", taskResult, attachmentsResult);

    let description;
    let attachments;
    let timing;
    let level;
    let type;
    let typeMatch;
    let levelMatch;
    let title;

    if (taskResult.status === "fulfilled" && taskResult.value) {
      const trelloCard = taskResult.value as TrelloCard;
      description = trelloCard.desc;
      title = trelloCard.name;
      timing = this.getTiming(description);
      const typeAndLevel = this.getTypeAndLevel(trelloCard.name);
      level = typeAndLevel.level;
      type = typeAndLevel.type;
      typeMatch = typeAndLevel.typeMatch;
      levelMatch = typeAndLevel.levelMatch;
      description = this.cleanDescription(description, timing);
      title = this.cleanTitle(title, levelMatch, typeMatch);
    } else {
      console.warn("No description found or failed to get task");
    }

    if (attachmentsResult.status === "fulfilled" && attachmentsResult.value) {
      const attachmentsValues = attachmentsResult.value as TrelloAttachment[];
      const extractedAttachments =
        this.extractAttachmentsData(attachmentsValues);
      attachments = extractedAttachments;
    } else {
      console.warn("No attachments found or failed to load attachments");
    }

    const newTask = Task.create(task);
    newTask.description = description;
    newTask.attachments = attachments;
    newTask.timing = timing;
    newTask.type = type;
    newTask.level = level;
    newTask.title = title;

    console.log("task to upload", newTask);

    return await this.taskRepository.create(newTask);
  }

  private extractAttachmentsData(attachments: TrelloAttachment[]) {
    return attachments.map((attachment) => ({
      id: attachment.id,
      url: attachment.url,
    }));
  }

  private getTypeAndLevel(title: string) {
    console.log("🚀 ~ CreateTask ~ getTypeAndLevel ~ title:", title);
    try {
      const prefixRegex =
        /^(FEATURE|ENHANCEMENT|BUG|ERROR|WARNING)(\([^\)]+\))?:\s*/;
      let type = "Unspecified";
      let level = "Unspecified";

      let typeMatch = "";
      let levelMatch = "";

      const match = title.match(prefixRegex);
      if (match) {
        typeMatch = match[1];
        type = typeMatch;
        if (match[2]) {
          levelMatch = match[2];
          level = levelMatch.slice(1, -1); // Remove the parentheses
          level = level.replace(/\d+$/, ""); // Remove trailing numbers
        }
      }

      return {
        type,
        level,
        typeMatch,
        levelMatch,
      };
    } catch (error) {
      console.log("🚀 ~ CreateTask ~ getTypeAndLevel ~ error:", error);
      throw error;
    }
  }

  private cleanTitle(title: string, typeMatch: string, levelMatch: string) {
    console.log("🚀 ~ CreateTask ~ cleanTitle ~ levelMatch:", levelMatch)
    console.log("🚀 ~ CreateTask ~ cleanTitle ~ typeMatch:", typeMatch)
    try {
      let cleanTitle = "";
      const noLevel = levelMatch ? title.replace(levelMatch, "") : title;
      const noType = typeMatch ? noLevel.replace(typeMatch, "") : noLevel;
      cleanTitle = noType;
      return cleanTitle;
    } catch (error) {
      console.log("🚀 ~ CreateTask ~ cleanTitle ~ error:", error);
      throw error;
    }
  }

  private cleanDescription(description: string, timing?: string) {
    console.log("🚀 ~ CreateTask ~ cleanDescription ~ timing:", timing);
    console.log(
      "🚀 ~ CreateTask ~ cleanDescription ~ description:",
      description
    );
    try {
      let cleanText = "";
      const noMarkdownImages = description.replace(/!\[.*?\]\((.*?)\)/g, ""); // remove markdown images
      const noLinks = noMarkdownImages.replace(/https?:\/\/[^\s]+/g, ""); // remove links
      const noTiming = timing ? noLinks.replace(timing, "") : noLinks; // remove timing
      cleanText = noTiming;
      return cleanText;
    } catch (error) {
      console.log("🚀 ~ CreateTask ~ cleanDescription ~ error:", error);
      throw error;
    }
  }

  private getTiming(description: string) {
    console.log("🚀 ~ CreateTask ~ getTiming ~ description:", description);
    try {
      const timingRegex = /\[\d+h\]/; // create timing regex
      const timingMatch = description.match(timingRegex); // extract timing
      let timing = timingMatch ? timingMatch[0] : undefined; // Default to [1h] if no timing found
      return timing;
    } catch (error) {
      console.log("🚀 ~ CreateTask ~ getTiming ~ error:", error);
      throw error;
    }
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

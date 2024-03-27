import { ITrelloService, TrelloAttachment, TrelloCard } from "src/domain/services/trelloService";
import axios from 'axios';
import config from "src/config";

export class TrelloService implements ITrelloService {
  async getCard(id: string) {
    const url = this.replaceParams(config.trello.getCard, id);
  
    try {
      const response = await axios.get(url);
      return response.data as TrelloCard;
    } catch (error) {
      console.error("There was an error getting the card: ", error);
      throw new Error('Failed to fetch card details');
    }
  }

  async getCardAttachments(id: string) {
    const url = this.replaceParams(config.trello.getCardAttachments, id);
    try {
      const response = await axios.get(url);
      console.log("attachments", response.data)

      return response.data as TrelloAttachment[];
    } catch (error) {
      console.error("There was an error getting the card attachments: ", error);
      throw new Error('Failed to fetch card attachments');
    }
  }

  private replaceParams(url: string, id: string) {
    url = this.replaceSecrets(url);
    url = this.replaceId(url, id);
    return url;
  }

  private replaceSecrets(url: string) {
    url = url.replace("APIKey", config.trello.apiKey);
    url = url.replace("APIToken", config.trello.token);
    return url;
  }

  private replaceId(url: string, id: string) {
    return url.replace("{id}", id);
  }
}
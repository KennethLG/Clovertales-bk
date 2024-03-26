import { ITrelloService, TrelloCard } from "src/domain/services/trelloService";
import axios from 'axios';
import config from "src/config";

export class TrelloService implements ITrelloService {
  async getCard(id: string) {
    let url = config.trello.getCard;

    url = url.replace("{id}", id)
    url = url.replace("APIKey", config.trello.apiKey);
    url = url.replace("APIToken", config.trello.token);

    try {
      const response = await axios.get(url)
      return response.data as TrelloCard;
    } catch (error) {
      console.error("There was an error getting the card", error);
      return null;
    }
  }
}
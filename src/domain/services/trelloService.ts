
export type TrelloCard = {
  id: string;
  desc: string;
}

export abstract class ITrelloService {
  getCard: (id: string) => Promise<TrelloCard | null>;
}
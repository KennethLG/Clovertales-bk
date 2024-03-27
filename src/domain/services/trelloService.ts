
export type TrelloAttachment = {
  id: string;
  url: string;
}

export type TrelloCard = {
  id: string;
  desc: string;
}

export abstract class ITrelloService {
  getCard: (id: string) => Promise<TrelloCard | null>;
  getCardAttachments: (id: string) => Promise<TrelloAttachment[] | null>;
}

export type TrelloAttachment = {
  id: string;
  url: string;
}

export type TrelloCard = {
  id: string;
  desc: string;
}

export abstract class ITrelloService {
  getCard: (id: string) => Promise<TrelloCard>;
  getCardAttachments: (id: string) => Promise<TrelloAttachment[]>;
}
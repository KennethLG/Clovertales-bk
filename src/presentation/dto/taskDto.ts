import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

class Card {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  desc?: string;
}

class List {
  @IsNotEmpty()
  @IsString()
  name: string;
}

class ActionData {
  @ValidateNested()
  @Type(() => Card)
  card: Card;

  @ValidateNested()
  @Type(() => List)
  listAfter: List;

  @ValidateNested()
  @Type(() => List)
  listBefore: List;
}

export class TrelloWebhookEvent {
  @ValidateNested()
  @Type(() => ActionData)
  action: {
    type: string;
    data: ActionData;
  }
}
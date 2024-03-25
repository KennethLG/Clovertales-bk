import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

class Card {
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  desc?: string;
}

class List {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

class ActionData {
  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => Card)
  @Expose()
  card: Card;

  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => List)
  @Expose()
  listAfter: List;

  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => List)
  @Expose()
  listBefore: List;
}

export class TrelloWebhookEvent {
  
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => ActionData)
  @ValidateNested()
  @Expose()
  action: {
    type: string;
    data: ActionData;
  }
}
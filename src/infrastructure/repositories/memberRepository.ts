import { Member } from "src/domain/entities/member";
import { DbClient } from "src/domain/repositories/dbClient";
import MemberRepository from "src/domain/repositories/memberRepository";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class MemberRepositoryImpl
  extends DbClientWrapper<Member>
  implements MemberRepository
{
  constructor(db: DbClient<Member>) {
    super(db);
  }
}

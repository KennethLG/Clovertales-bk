import { Member } from "src/domain/entities/member";
import DbClient from "src/domain/repositories/dbClient";
import MemberRepository from "src/domain/repositories/memberRepository";

export default class MemberRepositoryImpl implements MemberRepository {
  private dbClient: DbClient<Member>;
  constructor(db: DbClient<Member>) {
    this.dbClient = db;
  }
  async getAll() {
    const members = await this.dbClient.getAll();
    return members;
  }
} 
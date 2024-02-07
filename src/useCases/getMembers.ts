import { Member } from "../domain/entities/member";
import MemberRepository from "src/domain/repositories/memberRepository";

export default class GetMembers {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getAll(): Promise<Member[]> {
    const members = await this.memberRepository.getAll();
    return members;
  }
}

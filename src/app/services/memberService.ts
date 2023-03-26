import { Member } from "src/domain/entities/member";
import MemberRepository from "src/domain/repositories/memberRepository";

export default class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}
  
  async getAll(): Promise<Member[]> {
    const members = await this.memberRepository.getAll();
    return members;
  }
}

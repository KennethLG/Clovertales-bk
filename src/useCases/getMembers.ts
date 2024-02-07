import MemberService from "src/infrastructure/services/memberService";
import { Member } from "../domain/entities/member";

export default class GetMembers {
  constructor(private readonly memberService: MemberService) {}

  async getAll(): Promise<Member[]> {
    const members = await this.memberService.getAll();
    return members;
  }
}

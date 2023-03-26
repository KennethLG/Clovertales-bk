import MemberService from "src/app/services/memberService";
import { Member } from "../entities/member";

export default class GetMembers {
  constructor(private readonly memberService: MemberService) {}

  async getAll(): Promise<Member[]> {
    const members = await this.memberService.getAll();
    return members;
  }
}

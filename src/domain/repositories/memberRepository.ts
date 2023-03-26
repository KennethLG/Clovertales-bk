import { Member } from "../entities/member";

export default interface MemberRepository {
  getAll: () => Promise<Member[]>;
}

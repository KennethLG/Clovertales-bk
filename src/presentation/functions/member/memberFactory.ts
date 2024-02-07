import MemberService from "src/infrastructure/services/memberService";
import { Member } from "src/domain/entities/member";
import GetMembers from "src/useCases/getMembers";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import MemberRepositoryImpl from "src/infrastructure/repositories/memberRepository";

export const getMemberUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Member>("MembersTable");
  const memberRepository = new MemberRepositoryImpl(dbClient);
  const memberService = new MemberService(memberRepository);
  const getMembers = new GetMembers(memberService);

  return getMembers;
};

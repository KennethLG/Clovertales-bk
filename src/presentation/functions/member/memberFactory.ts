import { Member } from "src/domain/entities/member";
import GetMembers from "src/useCases/getMembers";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import MemberRepositoryImpl from "src/infrastructure/repositories/memberRepository";

export const getMemberUseCaseFactory = () => {
  const dbClient = new DynamoDbClient<Member>("MembersTable");
  const memberRepository = new MemberRepositoryImpl(dbClient);
  const getMembers = new GetMembers(memberRepository);

  return getMembers;
};

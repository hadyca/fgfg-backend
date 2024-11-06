import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    readOneMessage(chatRoomId: String!, messageId: Int!): MutationResult!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type CreateMessageResult {
    ok: Boolean!
    error: String
    messageId: Int
  }

  type Mutation {
    createMessage(chatRoomId: String!, payload: String!): CreateMessageResult!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type CreateChatRoomResult {
    ok: Boolean!
    error: String
    messageId: Int
    chatRoom: ChatRoom
  }

  type Mutation {
    createChatRoom(guideId: Int!, payload: String!): CreateChatRoomResult!
  }
`;

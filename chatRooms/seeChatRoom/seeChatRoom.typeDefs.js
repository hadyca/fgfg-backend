import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeChatRoom(chatRoomId: String!): ChatRoom
  }
`;

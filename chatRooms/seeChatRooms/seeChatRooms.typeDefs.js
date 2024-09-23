import { gql } from "graphql-tag";

export default gql`
  type SeeChatRoomsResult {
    id: String!
    avatar: String!
    usernameOrFullname: String!
    lastMessage: String!
    createdAt: String!
    isRead: Boolean!
  }

  type Query {
    seeChatRooms: [SeeChatRoomsResult]!
  }
`;

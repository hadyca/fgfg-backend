import { gql } from "graphql-tag";

export default gql`
  type ChatRoom {
    id: String!
    users: [User]
    messages: [Message]
    guideUserId: Int!
    otherUserId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Message {
    id: Int!
    payload: String!
    chatRoom: ChatRoom!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

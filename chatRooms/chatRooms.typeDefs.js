import { gql } from "graphql-tag";

export default gql`
  type ChatRoom {
    id: String!
    users: [User]
    messages: [Message]
    normalUserId: Int!
    guideUserId: Int!
    otherUserId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Message {
    id: Int!
    payload: String!
    chatRoom: ChatRoom!
    isMyMessage: Boolean!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

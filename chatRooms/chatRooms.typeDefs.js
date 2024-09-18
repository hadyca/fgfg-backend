import { gql } from "graphql-tag";

export default gql`
  type ChatRoom {
    id: String!
    user: User!
    guide: Guide!
    messages: [Message]!
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    payload: String!
    chatRoom: ChatRoom!
    user: User
    guide: Guide
    createdAt: String!
    updatedAt: String!
  }
`;

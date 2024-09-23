import { gql } from "graphql-tag";

export default gql`
  type ChatRoom {
    id: String!
    users: [User]
    messages: [Message]
    guideUser: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    payload: String!
    chatRoom: ChatRoom!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type User {
    id: String!
    username: String!
    avatar: String
    email: String!
    guide: Guide
    isMe: Boolean!
    isGuide: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

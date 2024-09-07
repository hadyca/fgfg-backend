import { gql } from "graphql-tag";

export default gql`
  type User {
    id: Int!
    username: String!
    avatar: String
    email: String!
    guide: Guide
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

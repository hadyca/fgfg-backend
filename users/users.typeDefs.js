import { gql } from "graphql-tag";

export default gql`
  type User {
    id: String!
    username: String!
    avatar: String
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Guide {
    id: String!
    fullname: String!
    createdAt: String!
    updatedAt: String!
  }
`;

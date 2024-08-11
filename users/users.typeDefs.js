import { gql } from "graphql-tag";

export default gql`
  type User {
    id: String!
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(userName: String!): User
  }
`;

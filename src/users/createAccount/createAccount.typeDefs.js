import { gql } from "graphql-tag";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): createAccountResult!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type createAccountResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): createAccountResult!
  }
`;

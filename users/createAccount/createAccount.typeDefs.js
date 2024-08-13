import { gql } from "graphql-tag";

export default gql`
  type createAccountResult {
    ok: Boolean!
    id: Int
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

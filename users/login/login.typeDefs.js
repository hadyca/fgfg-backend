import { gql } from "graphql-tag";

export default gql`
  type loginResult {
    ok: Boolean!
    id: Int
    token: String
    error: String
  }

  type Mutation {
    login(email: String!, password: String!): loginResult!
  }
`;

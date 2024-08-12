import { gql } from "graphql-tag";

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): loginResult!
  }
`;

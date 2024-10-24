import { gql } from "graphql-tag";

export default gql`
  type loginResult {
    ok: Boolean!
    error: String
    token: String
    guideId: Int
  }

  type Mutation {
    login(email: String!, password: String!): loginResult!
  }
`;

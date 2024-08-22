import { gql } from "graphql-tag";

export default gql`
  type createGuideResult {
    ok: Boolean!
    error: String
    isGuide: Boolean!
  }

  type Mutation {
    createGuide(fullname: String!): createGuideResult!
  }
`;

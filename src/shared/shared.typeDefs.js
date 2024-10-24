import { gql } from "graphql-tag";

export default gql`
  scalar DateTime

  type MutationResult {
    ok: Boolean!
    error: String
  }
`;

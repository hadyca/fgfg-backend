import { gql } from "graphql-tag";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }
`;

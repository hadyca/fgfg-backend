import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteAccount: MutationResult!
  }
`;

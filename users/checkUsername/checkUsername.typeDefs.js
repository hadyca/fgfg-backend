import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    checkUsername(username: String!): MutationResponse!
  }
`;

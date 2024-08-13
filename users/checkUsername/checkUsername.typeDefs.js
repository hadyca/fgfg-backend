import { gql } from "graphql-tag";

export default gql`
  type Query {
    checkUsername(username: String!): MutationResponse!
  }
`;

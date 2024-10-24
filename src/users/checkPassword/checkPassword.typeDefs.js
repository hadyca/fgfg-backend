import { gql } from "graphql-tag";

export default gql`
  type Query {
    checkPassword(password: String!): MutationResult!
  }
`;

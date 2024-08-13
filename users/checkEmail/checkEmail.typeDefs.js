import { gql } from "graphql-tag";

export default gql`
  type Query {
    checkEmail(email: String!): MutationResponse!
  }
`;

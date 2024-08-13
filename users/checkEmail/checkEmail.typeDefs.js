import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    checkEmail(email: String!): MutationResponse!
  }
`;

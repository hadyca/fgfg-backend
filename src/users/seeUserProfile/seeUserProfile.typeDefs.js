import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserProfile(userId: Int!): User
  }
`;

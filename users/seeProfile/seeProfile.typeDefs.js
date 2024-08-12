import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeProfile(userId: Int!): User
  }
`;

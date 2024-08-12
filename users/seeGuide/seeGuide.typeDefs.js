import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeGuide(guideId: Int!): Guide
  }
`;

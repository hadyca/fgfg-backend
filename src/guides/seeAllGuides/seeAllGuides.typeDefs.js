import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAllGuides: [Guide]
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAllRevenues: [Revenue]
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAvailableGuides(startTime: String, endTime: String): [Guide]
  }
`;

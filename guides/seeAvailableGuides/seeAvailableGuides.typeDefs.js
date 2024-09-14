import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAvailableGuides(startTime: DateTime, endTime: DateTime): [Guide]
  }
`;

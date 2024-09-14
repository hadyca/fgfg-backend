import { gql } from "graphql-tag";

export default gql`
  scalar DateTime

  type Reservation {
    id: Int!
    guideId: Int!
    userId: Int!
    startTime: DateTime!
    endTime: DateTime!
    guideConfirm: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

import { gql } from "graphql-tag";

export default gql`
  type Reservation {
    id: Int!
    guideId: Int!
    userId: Int!
    startTime: DateTime!
    endTime: DateTime!
    guideConfirm: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

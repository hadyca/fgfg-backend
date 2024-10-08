import { gql } from "graphql-tag";

export default gql`
  type Reservation {
    id: Int!
    guideId: Int!
    userId: Int!
    startTime: DateTime!
    guide: Guide!
    endTime: DateTime!
    guideConfirm: Boolean!
    userCancel: Boolean!
    guideCancel: Boolean!
    serviceFee: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

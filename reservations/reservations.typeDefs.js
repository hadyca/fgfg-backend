import { gql } from "graphql-tag";

export default gql`
  type Reservation {
    id: Int!
    guideId: Int!
    user: User!
    userId: Int!
    startTime: DateTime!
    guide: Guide!
    endTime: DateTime!
    guideConfirm: Boolean!
    userCancel: Boolean!
    guideCancel: Boolean!
    serviceFee: Int!
    customerAgeRange: String!
    paymentIntentId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

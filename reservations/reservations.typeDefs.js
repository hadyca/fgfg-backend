import { gql } from "graphql-tag";

export default gql`
  type Reservation {
    id: Int!
    guideId: Int!
    userId: Int!
    startTime: String!
    endTime: String!
    guideConfirm: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

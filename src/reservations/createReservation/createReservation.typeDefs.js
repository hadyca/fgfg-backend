import { gql } from "graphql-tag";

export default gql`
  type createReservationResult {
    ok: Boolean!
    error: String
    reservation: Reservation
  }

  type Mutation {
    createReservation(
      guideId: Int!
      startTime: DateTime!
      endTime: DateTime!
      customerAgeRange: String!
    ): createReservationResult!
  }
`;

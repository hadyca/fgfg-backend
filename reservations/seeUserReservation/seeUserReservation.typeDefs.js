import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserReservation(reservationId: Int!): Reservation
  }
`;

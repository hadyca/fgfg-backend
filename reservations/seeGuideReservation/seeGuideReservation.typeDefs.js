import gql from "graphql-tag";

export default gql`
  type Query {
    seeGuideReservation(reservationId: Int!): Reservation
  }
`;

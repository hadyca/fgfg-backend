import gql from "graphql-tag";

export default gql`
  type Query {
    seeUserAllReservations: [Reservation]
  }
`;

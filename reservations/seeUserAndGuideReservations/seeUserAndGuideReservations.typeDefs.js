import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserAndGuideReservations(guideId: Int!): [Reservation]
  }
`;

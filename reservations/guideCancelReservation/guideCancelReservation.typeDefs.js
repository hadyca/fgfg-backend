import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    guideCancelReservation(reservationId: Int!): MutationResult!
  }
`;

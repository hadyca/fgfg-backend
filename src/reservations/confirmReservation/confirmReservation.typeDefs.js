import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    confirmReservation(reservationId: Int!): MutationResult!
  }
`;

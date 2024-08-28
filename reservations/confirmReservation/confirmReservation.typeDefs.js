import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    confirmReservation(
      reservationId: Int!
      guideConfirm: Boolean!
    ): MutationResult!
  }
`;

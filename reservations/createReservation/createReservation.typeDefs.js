import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createReservation(
      guideId: Int!
      startTime: DateTime!
      endTime: DateTime!
      customerAgeRange: String!
      paymentIntentId: String!
    ): MutationResult!
  }
`;

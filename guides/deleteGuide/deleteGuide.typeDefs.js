import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteGuide(guideId: Int!): MutationResult!
  }
`;

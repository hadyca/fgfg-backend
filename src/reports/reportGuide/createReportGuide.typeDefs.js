import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createReportGuide(guideId: Int!, reason: String!): MutationResult!
  }
`;

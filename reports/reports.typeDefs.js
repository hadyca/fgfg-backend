import { gql } from "graphql-tag";

export default gql`
  type ReportGuide {
    id: Int!
    fromUser: User!
    toGuide: Guide!
    reason: String!
    createdAt: DateTime!
  }
`;

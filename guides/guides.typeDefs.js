import { gql } from "graphql-tag";

export default gql`
  type Guide {
    id: String!
    fullname: String!
    createdAt: String!
    updatedAt: String!
  }
`;

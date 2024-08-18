import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuide(fullname: String): MutationResult!
  }
`;

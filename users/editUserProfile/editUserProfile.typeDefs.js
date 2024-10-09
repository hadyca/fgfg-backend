import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editUserProfile(
      username: String
      email: String
      avatar: String
      password: String
    ): MutationResult!
  }
`;

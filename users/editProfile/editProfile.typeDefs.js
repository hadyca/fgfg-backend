import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editProfile(
      username: String
      avatar: String
      password: String
    ): MutationResult!
  }
`;

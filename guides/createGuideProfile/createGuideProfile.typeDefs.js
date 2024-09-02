import { gql } from "graphql-tag";

export default gql`
  input PhotosInput {
    id: Int!
    url: String!
  }

  type Mutation {
    createGuideProfile(
      photos: [PhotosInput!]!
      personality: String!
      guideIntro: String!
    ): MutationResult!
  }
`;

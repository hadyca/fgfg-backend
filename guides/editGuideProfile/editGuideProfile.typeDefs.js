import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuideProfile(
      photos: [PhotosInput!]!
      personality: String!
      guideIntro: String!
    ): MutationResult!
  }
`;

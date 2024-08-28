import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuideProfile(
      photos: [PhotosInput!]!
      personality: String!
      height: String!
      guideIntro: String!
    ): MutationResult!
  }
`;

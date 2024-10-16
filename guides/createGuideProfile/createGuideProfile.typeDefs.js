import { gql } from "graphql-tag";

export default gql`
  input GuidePhotosInput {
    fileUrlOrder: Int!
    fileUrl: String!
  }

  type Mutation {
    createGuideProfile(
      guidePhotos: [GuidePhotosInput!]!
      personality: String!
      guideIntro: String!
      pickupPlaceMain: String!
      pickupPlaceLat: Float!
      pickupPlaceLng: Float!
      pickupPlaceDetail: String!
    ): MutationResult!
  }
`;

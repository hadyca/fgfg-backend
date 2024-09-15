import { gql } from "graphql-tag";

export default gql`
  input GuidePhotosInput {
    id: Int!
    url: String!
  }

  type Mutation {
    createGuideProfile(
      guidePhotos: [GuidePhotosInput!]!
      personality: String!
      guideIntro: String!
      pickupPlaceMain: String!
      pickupPlaceDetail: String!
      pickupPlaceLatitude: String!
      pickupPlaceLongitude: String!
    ): MutationResult!
  }
`;

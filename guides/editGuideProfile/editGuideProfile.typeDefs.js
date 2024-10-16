import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuideProfile(
      fullname: String
      birthdate: String
      height: String
      address: String
      phone: String
      language: [LanguageInput!]
      guidePhotos: [GuidePhotosInput]
      personality: String
      guideIntro: String
      pickupPlaceMain: String
      pickupPlaceLat: Float
      pickupPlaceLng: Float
      pickupPlaceDetail: String
      isActive: Boolean
      bankname: String
      bankAccount: String
    ): MutationResult!
  }
`;

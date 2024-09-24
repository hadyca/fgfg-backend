import { gql } from "graphql-tag";

export default gql`
  type Guide {
    id: Int!
    fullname: String!
    birthdate: String!
    height: String!
    address: String!
    phone: String!
    resumePhoto: String!
    selfIntro: String!
    guidePhotos: [File]
    mainGuidePhoto: File
    personality: String
    guideIntro: String
    language: String
    pickupPlaceMain: String
    pickupPlaceLat: Float
    pickupPlaceLng: Float
    pickupPlaceDetail: String
    isActive: Boolean
    isApproved: Boolean!
    user: User!
    reservations: [Reservation]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type File {
    id: Int!
    fileUrl: String!
    fileUrlOrder: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

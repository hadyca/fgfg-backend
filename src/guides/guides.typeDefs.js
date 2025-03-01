import { gql } from "graphql-tag";

export default gql`
  scalar JSON

  type OneMonthRevenue {
    date: String!
    amount: Int!
  }

  type Language {
    id: Int!
    language: String!
    level: String!
  }

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
    language: [Language]
    pickupPlaceMain: String
    pickupPlaceLat: Float
    pickupPlaceLng: Float
    pickupPlaceDetail: String
    isActive: Boolean
    isApproved: Boolean!
    bankname: String
    bankAccount: String
    user: User!
    reservations: [Reservation]
    revenue: [Revenue]
    totalAmount: Int
    totalUnTransferredAmount: Int
    totalReservations: Int
    totalGuideTime: Int
    oneMonthRevenue: [OneMonthRevenue]
    totalThisMonthRevenue: Int
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

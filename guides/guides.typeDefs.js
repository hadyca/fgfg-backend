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
    guidePhotos: [File]
    mainGuidePhoto: File
    personality: String
    guideIntro: String
    isActive: Boolean
    selfIntro: String!
    language: String
    isApproved: Boolean!
    user: User!
    reservations: [Reservation]
    createdAt: String!
    updatedAt: String!
  }

  type File {
    id: Int!
    fileUrl: String!
    fileUrlOrder: String!
    createdAt: String!
    updatedAt: String!
  }
`;

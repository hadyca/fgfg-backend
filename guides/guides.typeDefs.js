import { gql } from "graphql-tag";

export default gql`
  type Guide {
    id: String!
    fullname: String!
    birthdate: String!
    address: String!
    phone: String!
    photo: String!
    selfIntro: String!
    language: String!
    isApproved: Boolean!
    user: User!
    reservations: [Reservation]
    guideProfile: GuideProfile
  }

  type GuideProfile {
    id: String!
    guide: Guide!
    photos: [File]
    personality: String!
    guideIntro: String!
    isActive: Boolean!
  }

  type File {
    id: Int!
    fileUrl: String!
  }
`;

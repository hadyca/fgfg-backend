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
    Reservations: [Reservation]
  }

  type GuideProfile {
    id: String!
    fullname: String!
    age: String!
    guide: Guide!
    guidePhotos: [File]
    personality: String!
    height: String!
    guideIntro: String!
    isActive: Boolean!
  }

  type File {
    id: Int!
    fileUrl: String!
  }
`;

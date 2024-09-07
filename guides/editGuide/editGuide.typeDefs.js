import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuide(
      fullname: String!
      birthdate: String!
      address: String!
      phone: String!
      resumePhoto: String!
      selfIntro: String!
      language: [LanguageInput!]
      guidePhotos: [GuidePhotosInput]!
      personality: String!
      guideIntro: String!
    ): MutationResult!
  }
`;

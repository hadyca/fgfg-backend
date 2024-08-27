import { gql } from "graphql-tag";

export default gql`
  type createGuideResult {
    ok: Boolean!
    error: String
  }

  input LanguageInput {
    id: Int!
    language: String!
    level: String!
  }

  type Mutation {
    createGuide(
      fullname: String!
      birthdate: String!
      address: String!
      phone: String!
      photo: String!
      selfIntro: String!
      language: [LanguageInput!]
    ): createGuideResult!
  }
`;

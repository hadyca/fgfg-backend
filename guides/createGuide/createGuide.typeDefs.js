import { gql } from "graphql-tag";

export default gql`
  input LanguageInput {
    id: Int!
    language: String!
    level: String!
  }

  type Mutation {
    createGuide(
      fullname: String!
      birthdate: String!
      height: String!
      address: String!
      phone: String!
      photo: String!
      selfIntro: String!
      language: [LanguageInput!]
    ): MutationResult!
  }
`;

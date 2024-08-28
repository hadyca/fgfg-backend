import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGuide(
      fullname: String!
      birthdate: String!
      address: String!
      phone: String!
      photo: String!
      selfIntro: String!
      language: [LanguageInput!]
    ): MutationResult!
  }
`;

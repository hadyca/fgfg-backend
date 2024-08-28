import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeGuideProfile(guideId: Int!): GuideProfile
  }
`;

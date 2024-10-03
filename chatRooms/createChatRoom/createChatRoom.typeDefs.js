import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createChatRoom(guideId: Int!, payload: String!): ChatRoom!
  }
`;

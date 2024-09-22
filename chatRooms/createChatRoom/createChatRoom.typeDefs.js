import { gql } from "graphql-tag";

export default gql`
  type createChatRoomResult {
    id: String!
  }

  type Mutation {
    createChatRoom(guideId: Int!, payload: String!): createChatRoomResult!
  }
`;

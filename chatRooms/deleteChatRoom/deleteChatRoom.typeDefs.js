import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteChatRoom(chatRoomId: String!): MutationResult!
  }
`;

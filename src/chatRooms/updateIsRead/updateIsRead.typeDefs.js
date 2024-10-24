import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateIsRead(chatRoomId: String!): MutationResult!
  }
`;

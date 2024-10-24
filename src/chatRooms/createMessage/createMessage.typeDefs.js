import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createMessage(chatRoomId: String!, payload: String!): MutationResult!
  }
`;

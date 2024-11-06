import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    readAllMessages(chatRoomId: String!): MutationResult!
  }
`;

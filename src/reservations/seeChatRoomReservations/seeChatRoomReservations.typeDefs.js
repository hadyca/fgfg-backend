import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeChatRoomReservations(chatRoomId: String!): [Reservation]
  }
`;

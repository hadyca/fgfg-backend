import { gql } from "graphql-tag";

export default gql`
  type Revenue {
    id: Int!
    amount: Int!
    reservation: Reservation!
    isTransfer: Boolean!
    createdAt: DateTime!
  }
`;

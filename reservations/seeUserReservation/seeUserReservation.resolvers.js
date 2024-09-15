import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUserReservation: protectedResolver(
      async (_, { reservationId }, { loggedInUser }) => {
        try {
          const reservation = await client.reservation.findUnique({
            where: {
              id: reservationId,
            },
          });
          if (reservation.userId !== loggedInUser.id) {
            throw new Error("틀린 계정입니다.");
          }
          return reservation;
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

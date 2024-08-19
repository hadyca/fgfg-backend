import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeGuideReservation: protectedResolver(
      async (_, { reservationId }, { loggedInUser }) => {
        try {
          const guide = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          const reservation = await db.reservation.findUnique({
            where: {
              id: reservationId,
            },
          });
          if (reservation.guideId !== guide.id) {
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
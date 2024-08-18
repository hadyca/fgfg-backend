import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeGuideAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const guide = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });

          const reservations = await db.reservation.findMany({
            where: {
              guideId: guide.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          return reservations;
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

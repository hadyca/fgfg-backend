import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeGuideAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const guide = await client.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (!guide?.isApproved) {
            return;
          }
          const reservations = await client.reservation.findMany({
            where: {
              guideId: guide.id,
            },
            include: {
              user: true,
            },
            orderBy: {
              startTime: "asc",
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

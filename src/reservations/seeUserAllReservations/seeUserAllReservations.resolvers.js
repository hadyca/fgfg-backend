import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUserAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const reservations = await client.reservation.findMany({
            where: {
              userId: loggedInUser.id,
              isDeposited: true,
            },
            include: {
              guide: true,
            },
            orderBy: {
              startTime: "asc",
            },
          });
          const filteredReservations = reservations.filter(
            (reservation) => reservation.guide !== null
          );

          return filteredReservations;
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

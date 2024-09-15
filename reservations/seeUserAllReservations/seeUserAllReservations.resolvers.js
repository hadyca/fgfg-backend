import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUserAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const reservations = client.reservation.findMany({
            where: {
              userId: loggedInUser.id,
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

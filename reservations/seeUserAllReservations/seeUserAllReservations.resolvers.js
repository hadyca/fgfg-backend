import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUserAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const reservations = db.reservation.findMany({
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

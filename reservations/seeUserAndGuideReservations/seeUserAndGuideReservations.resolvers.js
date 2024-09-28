import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUserAndGuideReservations: protectedResolver(
      async (_, { guideId }, { loggedInUser }) => {
        const reservations = await client.reservation.findMany({
          where: {
            AND: {
              guideId,
              userId: loggedInUser.id,
            },
          },
        });

        return reservations;
      }
    ),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    userCancelReservation: protectedResolver(
      async (_, { reservationId }, { loggedInUser }) => {
        const reservation = await client.reservation.findFirst({
          where: {
            id: reservationId,
          },
        });

        if (loggedInUser.id !== reservation.userId) {
          return {
            ok: false,
            error: "잘못된 사용자 입니다.",
          };
        }
        await client.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            userCancel: true,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

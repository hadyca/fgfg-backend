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
            error: "Invalid user.",
          };
        }

        if (reservation.guideConfirm) {
          return {
            ok: false,
            error: "This reservation has already been confirmed by the guide.",
          };
        }

        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "You must cancel the reservation before the start time.",
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

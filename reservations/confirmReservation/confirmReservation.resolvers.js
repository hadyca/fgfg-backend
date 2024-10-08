import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    confirmReservation: protectedResolver(
      async (_, { reservationId, guideConfirm }, { loggedInUser }) => {
        try {
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            include: {
              guide: true,
            },
          });

          const reservation = await client.reservation.findFirst({
            where: {
              id: reservationId,
            },
          });

          if (user.guide.id !== reservation.guideId) {
            return {
              ok: false,
              error: "가이드 계정이 틀립니다.",
            };
          }
          if (guideConfirm) {
            await client.reservation.update({
              where: {
                id: reservationId,
              },
              data: {
                guideConfirm,
              },
            });
            return {
              ok: true,
            };
          } else {
            await client.reservation.delete({
              where: {
                id: reservationId,
              },
            });
            return {
              ok: true,
            };
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

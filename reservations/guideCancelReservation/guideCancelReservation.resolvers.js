import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    guideCancelReservation: protectedResolver(
      async (_, { reservationId }, { loggedInUser }) => {
        const reservation = await client.reservation.findFirst({
          where: {
            id: reservationId,
          },
        });

        const guide = await client.guide.findUnique({
          where: {
            userId: loggedInUser.id,
          },
          select: {
            id: true,
          },
        });

        if (guide.id !== reservation.guideId) {
          return {
            ok: false,
            error: "잘못된 사용자 입니다.",
          };
        }
        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "예약 시작 시간 전에 취소 해야 합니다.",
          };
        }

        await client.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            guideCancel: true,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

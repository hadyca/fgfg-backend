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

        if (reservation.guideConfirm) {
          return {
            ok: false,
            error: "이미 가이드가 예약을 수락하였습니다.",
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

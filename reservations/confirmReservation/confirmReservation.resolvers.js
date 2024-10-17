import client from "../../client";
import getExchangeRate from "../../lib/getExchangeRate";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    confirmReservation: protectedResolver(
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

        if (reservation.userCancel) {
          return {
            ok: false,
            error: "이미 고객님이 예약을 취소하였습니다.",
          };
        }

        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "예약 시작 시간 전에 수락 해야 합니다.",
          };
        }

        await client.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            guideConfirm: true,
          },
        });

        const vndRate = await getExchangeRate();
        if (!vndRate) {
          return {
            ok: false,
            error: "환율 정보를 가져올 수 없습니다.",
          };
        }

        const calculateRevenue = (reservation.serviceFee / 2) * vndRate;

        await client.revenue.create({
          data: {
            amount: calculateRevenue,
            reservation: {
              connect: {
                id: reservationId,
              },
            },
            guide: {
              connect: {
                id: guide.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

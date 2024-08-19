import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createReservation: protectedResolver(
      async (
        _,
        { guideId, startTime: newStartTime, endTime: newEndTime },
        { loggedInUser }
      ) => {
        try {
          const guide = await db.guide.findUnique({
            where: {
              id: guideId,
            },
          });
          if (guide.userId === loggedInUser.id) {
            return {
              ok: false,
              error: "고객님과 가이드님이 동일합니다.",
            };
          }

          const existingReservation = await db.reservation.findFirst({
            where: {
              guideId,
              OR: [
                {
                  // 새로운 예약의 시작 시간이 기존 예약의 시작과 종료 시간 사이에 있는 경우
                  AND: [
                    { startTime: { lte: newStartTime } },
                    { endTime: { gt: newStartTime } },
                  ],
                },
                {
                  // 새로운 예약의 종료 시간이 기존 예약의 시작과 종료 시간 사이에 있는 경우
                  AND: [
                    { startTime: { lt: newEndTime } },
                    { endTime: { gte: newEndTime } },
                  ],
                },
                {
                  // 새로운 예약이 기존 예약을 완전히 포함하는 경우
                  AND: [
                    { startTime: { gte: newStartTime } },
                    { endTime: { lte: newEndTime } },
                  ],
                },
              ],
            },
            select: {
              guideId: true,
            },
          });
          if (existingReservation) {
            return {
              ok: false,
              error: "해당 시간은 예약이 안됩니다.",
            };
          }
          const reservation = await db.reservation.create({
            data: {
              startTime: newStartTime,
              endTime: newEndTime,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              guide: {
                connect: {
                  id: guideId,
                },
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};
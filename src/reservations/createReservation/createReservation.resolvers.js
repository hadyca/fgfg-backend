import client from "../../client";
import { HOUR_FEE } from "../../constants";
import { protectedResolver } from "../../users/users.utils";
import { DateTimeResolver } from "graphql-scalars";

export default {
  DateTime: DateTimeResolver,
  Mutation: {
    createReservation: protectedResolver(
      async (
        _,
        {
          guideId,
          startTime: newStartTime,
          endTime: newEndTime,
          customerAgeRange,
        },
        { loggedInUser }
      ) => {
        try {
          const now = new Date();

          // newStartTime 또는 newEndTime이 현재 시간보다 이전인지 확인
          if (new Date(newStartTime) < now || new Date(newEndTime) < now) {
            return {
              ok: false,
              error: "Start time and end time must be in the future.",
            };
          }

          const guide = await client.guide.findUnique({
            where: {
              id: guideId,
            },
          });

          if (guide.userId === loggedInUser.id) {
            return {
              ok: false,
              error: "You cannot make a reservation for your own account.",
            };
          }

          if (!guide.isActive) {
            return {
              ok: false,
              error: "Guides on break cannot make reservations.",
            };
          }

          const existingReservation = await client.reservation.findMany({
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
              userCancel: true,
              guideCancel: true,
            },
          });
          if (existingReservation.length > 0) {
            const hasActiveReservation = existingReservation.some(
              (reservation) =>
                !reservation.userCancel && !reservation.guideCancel
            );

            if (hasActiveReservation) {
              return {
                ok: false,
                error: "This time is already reserved.",
              };
            }
          }

          const timeDifference = newEndTime - newStartTime;
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          const serviceFee = hoursDifference * HOUR_FEE;

          const randomId = Math.floor(10000000 + Math.random() * 90000000);

          const newReservation = await client.reservation.create({
            data: {
              id: randomId,
              startTime: newStartTime,
              endTime: newEndTime,
              serviceFee,
              customerAgeRange,
              pickupPlaceMain: guide.pickupPlaceMain,
              pickupPlaceDetail: guide.pickupPlaceDetail,
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
            reservation: newReservation,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

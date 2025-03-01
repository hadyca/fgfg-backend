import client from "../../client";
import { DateTimeResolver } from "graphql-scalars";

export default {
  DateTime: DateTimeResolver,
  Query: {
    seeAvailableGuides: async (
      _,
      { startTime: newStartTime, endTime: newEndTime }
    ) => {
      try {
        if (!newStartTime || !newEndTime) {
          const guides = await client.guide.findMany({
            where: {
              isApproved: true,
            },
            orderBy: [
              { isActive: "desc" }, // isActive가 true인 가이드를 우선 정렬
              { createdAt: "desc" }, // 생성 날짜 기준으로 정렬
            ],
          });
          return guides;
        }

        const existingReservation = await client.reservation.findMany({
          where: {
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
          distinct: ["guideId"],
        });

        const guideIds = existingReservation.map((item) => item.guideId);
        const guides = await client.guide.findMany({
          where: {
            id: { notIn: guideIds }, // 중복 ID 제외
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return guides;
      } catch (error) {
        return error;
      }
    },
  },
};

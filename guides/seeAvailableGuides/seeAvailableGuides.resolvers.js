import db from "../../db";

export default {
  Query: {
    seeAvailableGuides: async (
      _,
      { startTime: originalStartTime, endTime: originalEndTime }
    ) => {
      try {
        let newEndTime = originalEndTime;

        if (!originalStartTime || !newEndTime) {
          const guides = await db.guide.findMany({
            where: {
              isApproved: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          return guides;
        }

        // newEndTime이 "T24:00:00.000Z" 형태인지 확인
        if (newEndTime.includes("T24:00:00.000Z")) {
          const endDate = new Date(newEndTime);

          // 하루를 더해주고 시간을 00:00으로 설정
          endDate.setUTCDate(endDate.getUTCDate() + 1);
          newEndTime = endDate.toISOString(); // 수정된 ISO 8601 형식으로 변환
        }

        const existingReservation = await db.reservation.findMany({
          where: {
            OR: [
              {
                // 새로운 예약의 시작 시간이 기존 예약의 시작과 종료 시간 사이에 있는 경우
                AND: [
                  { startTime: { lte: originalStartTime } },
                  { endTime: { gt: originalStartTime } },
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
                  { startTime: { gte: originalStartTime } },
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
        const guides = await db.guide.findMany({
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

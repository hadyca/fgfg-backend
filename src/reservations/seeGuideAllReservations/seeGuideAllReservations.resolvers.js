import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeGuideAllReservations: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const guide = await client.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (!guide?.isApproved) {
            return;
          }
          const reservations = await client.reservation.findMany({
            where: {
              guideId: guide.id,
              isDeposited: true,
            },
            include: {
              user: true,
            },
            orderBy: [
              {
                guideConfirm: "asc", // guideConfirm이 false인 것이 먼저 나오게 설정
              },
              {
                startTime: "asc", // guideConfirm이 같을 경우 startTime을 기준으로 오름차순 정렬
              },
            ],
          });
          // user가 null이 아닌 예약만 필터링
          const filteredReservations = reservations.filter(
            (reservation) => reservation.user !== null
          );

          return filteredReservations;
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

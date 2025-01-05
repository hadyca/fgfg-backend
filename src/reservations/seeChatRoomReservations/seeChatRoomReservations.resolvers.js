import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeChatRoomReservations: protectedResolver(async (_, { chatRoomId }) => {
      const chatRoom = await client.chatRoom.findUnique({
        where: {
          id: chatRoomId,
        },
        select: {
          normalUserId: true,
          guideUserId: true,
          users: {
            select: { id: true },
          },
        },
      });
      const reservations = await client.reservation.findMany({
        where: {
          AND: [
            { guideId: chatRoom.guideUserId },
            { userId: chatRoom.normalUserId },
            { endTime: { gt: new Date() } },
            { isDeposited: true },
          ],
        },
        orderBy: {
          startTime: "asc",
        },
      });
      return reservations;
    }),
  },
};

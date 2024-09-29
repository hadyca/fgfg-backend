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
          guideUserId: true,
          users: {
            select: { id: true },
          },
        },
      });

      const filteredUser = chatRoom.users.filter(
        (user) => user.id !== chatRoom.guideUserId
      );
      const userId = filteredUser.length > 0 ? filteredUser[0].id : null;

      const reservations = await client.reservation.findMany({
        where: {
          AND: [
            { guideId: chatRoom.guideUserId },
            { userId },
            { endTime: { gt: new Date() } },
          ],
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          guideConfirm: true,
        },
        orderBy: {
          startTime: "asc",
        },
      });
      return reservations;
    }),
  },
};

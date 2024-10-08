import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeChatRoom: protectedResolver(
      async (_, { chatRoomId }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.findUnique({
          where: {
            id: chatRoomId,
          },
          include: {
            users: {
              select: { id: true },
            },
          },
        });
        // chatRoom이 null인 경우 처리
        if (!chatRoom) {
          return;
        }
        const canSee = Boolean(
          chatRoom.users.find((user) => user.id === loggedInUser.id)
        );
        if (!canSee) {
          return;
        }
        return chatRoom;
      }
    ),
  },
};

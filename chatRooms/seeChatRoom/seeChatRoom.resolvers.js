import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeChatRoom: protectedResolver(
      async (_, { chatRoomId, guideId }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.findUnique({
          where: {
            id: chatRoomId,
          },
        });
        const canSee = Boolean(
          chatRoom.guideId === guideId || chatRoom.userId === loggedInUser.id
        );
        if (!canSee) {
          return;
        }
        return chatRoom;
      }
    ),
  },
};

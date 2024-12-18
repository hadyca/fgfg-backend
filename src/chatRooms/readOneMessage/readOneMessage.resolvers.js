import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readOneMessage: protectedResolver(
      async (_, { chatRoomId, messageId }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.findUnique({
          where: {
            id: chatRoomId,
          },
          select: {
            users: {
              select: {
                id: true,
              },
            },
          },
        });
        const isUserInChatRoom = chatRoom.users.some(
          (user) => user.id === loggedInUser.id
        );
        if (!isUserInChatRoom) {
          return {
            ok: false,
            error: "User is not in the chat room.",
          };
        }
        await client.message.update({
          where: {
            id: messageId,
          },
          data: {
            isRead: true,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteChatRoom: protectedResolver(
      async (_, { chatRoomId }, { loggedInUser }) => {
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
            error: "없는 채팅방이거나, 해당 유저가 없습니다.",
          };
        }

        if (chatRoom.users.length === 2) {
          await client.chatRoom.update({
            where: {
              id: chatRoomId,
            },
            data: {
              users: {
                disconnect: { id: loggedInUser.id },
              },
            },
          });
        } else {
          await client.chatRoom.delete({
            where: {
              id: chatRoomId,
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

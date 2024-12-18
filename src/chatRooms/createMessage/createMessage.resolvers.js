import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createMessage: protectedResolver(
      async (_, { chatRoomId, payload }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.findUnique({
          where: {
            id: chatRoomId,
          },
          select: {
            normalUserId: true,
            guideUserId: true,
            users: {
              select: {
                id: true,
              },
            },
          },
        });

        //만약 채팅방에 1명만 있으면, 상대방을 chatRoom에 connect 해준다
        if (chatRoom.users.length === 1) {
          const otherUserId =
            loggedInUser.id === chatRoom.normalUserId
              ? chatRoom.guideUserId
              : chatRoom.normalUserId;
          const otherUser = await client.user.findUnique({
            where: {
              id: otherUserId,
            },
            select: {
              id: true,
            },
          });

          if (!otherUser) {
            return {
              ok: false,
              error: "The other user has left the service.",
            };
          }

          // 업데이트할 필드 정의
          const updateData = {
            users: {
              connect: {
                id: otherUserId,
              },
            },
          };

          // otherUserId가 normalUserId면 normalUserRejoinedAt 업데이트
          if (otherUserId === chatRoom.normalUserId) {
            updateData["normalUserRejoinedAt"] = new Date();
          }

          // otherUserId가 guideUserId면 guideUserRejoinedAt 업데이트
          if (otherUserId === chatRoom.guideUserId) {
            updateData["guideUserRejoinedAt"] = new Date();
          }

          await client.chatRoom.update({
            where: {
              id: chatRoomId,
            },
            data: updateData,
          });
        }

        const message = await client.message.create({
          data: {
            payload,
            user: {
              connect: { id: loggedInUser.id },
            },
            chatRoom: {
              connect: { id: chatRoomId },
            },
          },
          select: {
            id: true,
          },
        });
        return {
          ok: true,
          messageId: message.id,
        };
      }
    ),
  },
};

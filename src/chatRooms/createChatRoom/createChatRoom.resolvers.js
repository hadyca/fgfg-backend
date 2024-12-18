import client from "../../client";
import { sendChatRoomNotificationEmail } from "../../lib/sendEmail";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createChatRoom: protectedResolver(
      async (_, { guideId, payload }, { loggedInUser }) => {
        // Guide 정보 가져오기
        const guide = await client.guide.findUnique({
          where: {
            id: guideId,
          },
          include: {
            user: true,
          },
        });

        if (guide.userId === loggedInUser.id) {
          return {
            ok: false,
            error: "You cannot send a message to your own account.",
          };
        }

        if (!guide.isActive) {
          return {
            ok: false,
            error: "This guide is currently inactive.",
          };
        }

        let chatRoom = await client.chatRoom.findFirst({
          where: {
            normalUserId: loggedInUser.id,
            guideUserId: guide.userId,
          },
          select: {
            id: true,
            users: {
              select: {
                id: true,
              },
            },
          },
        });

        const isMeInChatRoom =
          chatRoom?.users?.some((user) => user.id === loggedInUser.id) ?? false;

        const isGuideInChatRoom =
          chatRoom?.users?.some((user) => user.id === guide.user.id) ?? false;

        if (chatRoom && !isMeInChatRoom) {
          // 이미 존재하는 채팅방에 user 연결 및 재연결 시간 기록
          chatRoom = await client.chatRoom.update({
            where: {
              id: chatRoom.id,
            },
            data: {
              users: {
                connect: { id: loggedInUser.id },
              },
              normalUserRejoinedAt: new Date(),
            },
            select: { id: true },
          });
        }
        if (chatRoom && !isGuideInChatRoom) {
          // 이미 존재하는 채팅방에 user 연결 및 재연결 시간 기록
          chatRoom = await client.chatRoom.update({
            where: {
              id: chatRoom.id,
            },
            data: {
              users: {
                connect: { id: guide.user.id },
              },
              guideUserRejoinedAt: new Date(),
            },
            select: { id: true },
          });
        }

        if (!chatRoom) {
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            select: {
              username: true,
            },
          });
          await sendChatRoomNotificationEmail(
            guide.user.email,
            guide.fullname,
            user.username
          );

          chatRoom = await client.chatRoom.create({
            data: {
              users: {
                connect: [{ id: loggedInUser.id }, { id: guide.userId }],
              },
              normalUserId: loggedInUser.id,
              guideUserId: guide.userId,
            },
            select: { id: true },
          });
        }

        // 메시지 생성
        const message = await client.message.create({
          data: {
            payload,
            user: {
              connect: { id: loggedInUser.id },
            },
            chatRoom: {
              connect: { id: chatRoom.id },
            },
          },
          select: {
            id: true,
          },
        });
        return {
          ok: true,
          messageId: message.id,
          chatRoom,
        };
      }
    ),
  },
};

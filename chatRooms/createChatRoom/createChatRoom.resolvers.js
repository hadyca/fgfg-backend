import client from "../../client";
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
        });

        let chatRoom = await client.chatRoom.findFirst({
          where: {
            normalUserId: loggedInUser.id,
            guideUserId: guide.id,
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

        const isUserInChatRoom =
          chatRoom?.users?.some((user) => user.id === loggedInUser.id) ?? false;

        if (chatRoom && !isUserInChatRoom) {
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

        if (!chatRoom) {
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
        await client.message.create({
          data: {
            payload,
            user: {
              connect: { id: loggedInUser.id },
            },
            chatRoom: {
              connect: { id: chatRoom.id },
            },
          },
        });

        return chatRoom;
      }
    ),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readAllMessages: protectedResolver(
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
            error: "채팅방에 없는 사용자 입니다.",
          };
        }
        await client.message.updateMany({
          where: {
            chatRoomId,
            isRead: false, // 아직 읽지 않은 메시지들
            userId: {
              not: loggedInUser.id, // 현재 사용자가 아닌 메시지들
            },
          },
          data: {
            isRead: true, // isRead 값을 true로 업데이트
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

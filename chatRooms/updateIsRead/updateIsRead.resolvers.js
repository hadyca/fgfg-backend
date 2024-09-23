import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateIsRead: protectedResolver(
      async (_, { chatRoomId }, { loggedInUser }) => {
        // 1. 채팅방의 모든 메시지 중 현재 사용자가 아닌 메시지들을 업데이트
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

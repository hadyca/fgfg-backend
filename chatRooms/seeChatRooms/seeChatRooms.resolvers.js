import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeChatRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
        select: {
          chatRooms: {
            include: {
              users: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                  guide: {
                    select: {
                      fullname: true, // guide의 fullname을 포함
                    },
                  },
                },
              },
              messages: {
                orderBy: { createdAt: "desc" },
                select: {
                  payload: true,
                  createdAt: true,
                  isRead: true,
                  userId: true,
                },
              },
            },
          },
        },
      });

      if (!user || !user.chatRooms) {
        return []; // 채팅방이 없을 경우 빈 배열 반환
      }
      const chatRoomsResult = user.chatRooms.map((chatRoom) => {
        const hasMessages = chatRoom.messages && chatRoom.messages.length > 0;

        const lastMessage = hasMessages ? chatRoom.messages[0].payload : ""; // 메시지가 없을 때 기본 값 설정
        const createdAt = hasMessages ? chatRoom.messages[0].createdAt : ""; // 메시지가 없을 때 빈 값 설정

        const otherUser = chatRoom.users.find(
          (user) => user.id !== loggedInUser.id
        );
        let usernameOrFullname;
        if (otherUser.id === chatRoom.guideUserId) {
          usernameOrFullname = otherUser.guide.fullname;
        } else {
          usernameOrFullname = otherUser.username;
        }

        // 전체 메시지에서 상대방(otherUser)이 보낸 메시지 중 하나라도 읽지 않은(isRead: false) 메시지가 있는지 확인
        const hasUnreadMessage = chatRoom.messages.some(
          (message) => message.userId === otherUser.id && !message.isRead
        );

        const isRead = !hasUnreadMessage; // 상대방이 보낸 메시지 중 읽지 않은 메시지가 없으면 isRead는 true

        return {
          id: chatRoom.id,
          avatar: otherUser.avatar || "",
          usernameOrFullname,
          lastMessage,
          createdAt,
          isRead,
        };
      });
      // createdAt 기준으로 내림차순 정렬 (최신 메시지가 먼저 나오도록)
      chatRoomsResult.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return chatRoomsResult;
    }),
  },
};

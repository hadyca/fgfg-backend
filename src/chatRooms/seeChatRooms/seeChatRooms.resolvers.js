import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeChatRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
      const chatRoomsResult = await Promise.all(
        user.chatRooms.map(async (chatRoom) => {
          const hasMessages = chatRoom.messages && chatRoom.messages.length > 0;

          const lastMessage = hasMessages ? chatRoom.messages[0].payload : ""; // 메시지가 없을 때 기본 값 설정
          const createdAt = hasMessages
            ? chatRoom.messages[0].createdAt
            : new Date().toISOString();

          const otherUserId =
            loggedInUser.id === chatRoom.normalUserId
              ? chatRoom.guideUserId
              : chatRoom.normalUserId;

          const otherUser = await client.user.findUnique({
            where: {
              id: otherUserId,
            },
            select: {
              username: true,
              avatar: true,
              guide: {
                select: {
                  fullname: true,
                },
              },
            },
          });

          let usernameOrFullname;
          if (otherUserId === chatRoom.guideUserId) {
            usernameOrFullname = otherUser?.guide?.fullname || "Unknown";
          } else {
            usernameOrFullname = otherUser?.username || "Unknown";
          }

          const hasUnreadMessage = chatRoom.messages.some(
            (message) => message.userId === otherUserId && !message.isRead
          );

          const isRead = !hasUnreadMessage;

          return {
            id: chatRoom.id,
            avatar: otherUser?.avatar || "",
            usernameOrFullname,
            lastMessage,
            createdAt,
            isRead,
          };
        })
      );

      // createdAt 기준으로 내림차순 정렬 (최신 메시지가 먼저 나오도록)
      chatRoomsResult.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return chatRoomsResult;
    }),
  },
};

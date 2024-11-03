import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeMessages: protectedResolver(
      async (_, { chatRoomId }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.findUnique({
          where: {
            id: chatRoomId,
          },
          select: {
            normalUserId: true,
            normalUserRejoinedAt: true,
            guideUserRejoinedAt: true,
          },
        });

        const reJoinedAt =
          loggedInUser.id === chatRoom.normalUserId
            ? chatRoom.normalUserRejoinedAt
            : chatRoom.guideUserRejoinedAt;

        const messages = await client.message.findMany({
          where: {
            chatRoomId,
            ...(reJoinedAt && {
              createdAt: {
                gte: reJoinedAt,
              },
            }),
          },
          select: {
            id: true,
            payload: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                avatar: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return messages;
      }
    ),
  },
};

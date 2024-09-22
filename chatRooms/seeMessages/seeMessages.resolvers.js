import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeMessages: protectedResolver(async (_, { chatRoomId }) => {
      const messages = await client.message.findMany({
        where: {
          chatRoomId,
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
      });

      return messages;
    }),
  },
};

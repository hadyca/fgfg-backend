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
          userId: true,
          created_at: true,
          user: {
            select: {
              avatar: true,
              username: true,
            },
          },
          guide: {
            select: {
              fullname: true,
              user: {
                select: {
                  avatar: true,
                },
              },
            },
          },
        },
      });

      return messages;
    }),
  },
};

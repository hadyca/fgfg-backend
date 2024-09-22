import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createMessage: protectedResolver(
      async (_, { chatRoomId, payload }, { loggedInUser }) => {
        await client.message.create({
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
        };
      }
    ),
  },
};

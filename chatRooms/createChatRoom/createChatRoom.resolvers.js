import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createChatRoom: protectedResolver(
      async (_, { guideId }, { loggedInUser }) => {
        const chatRoom = await client.chatRoom.create({
          data: {
            user: {
              connect: { id: loggedInUser.id },
            },
            guide: {
              connect: { id: guideId },
            },
          },
        });
        return {
          id: chatRoom.id,
        };
      }
    ),
  },
};

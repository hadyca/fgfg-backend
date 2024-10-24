import client from "../client";

export default {
  ChatRoom: {
    otherUserId: async ({ id }, _, { loggedInUser }) => {
      const chatRoom = await client.chatRoom.findUnique({
        where: {
          id,
        },
        select: {
          users: true,
          normalUserId: true,
          guideUserId: true,
        },
      });

      const otherUserId =
        loggedInUser.id === chatRoom.normalUserId
          ? chatRoom.guideUserId
          : chatRoom.normalUserId;
      return otherUserId;
    },
  },
  Message: {
    isMyMessage: async ({ id }, _, { loggedInUser }) => {
      const message = await client.message.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      return message.userId === loggedInUser.id;
    },
  },
};

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
        },
      });
      const otherUser = chatRoom.users.find(
        (user) => user.id !== loggedInUser.id
      );
      return otherUser.id;
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

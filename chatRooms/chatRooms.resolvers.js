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
};

import db from "../db";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isGuide: async ({ id }) => {
      const exist = await db.guide.findUnique({
        where: {
          userId: id,
        },
      });
      return Boolean(exist);
    },
  },
};

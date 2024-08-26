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
      const guide = await db.guide.findUnique({
        where: {
          userId: id,
        },
      });
      if (guide === null) {
        return null; // 값이 존재하지 않으면 null 반환
      }
      return guide.isApproved;
    },
  },
};

import db from "../../db";

export default {
  Query: {
    seeUserProfile: async (_, { userId }) => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      try {
        const user = await db.user.findUnique({
          where: { id: userId },
        });
        return user;
      } catch (error) {
        return error;
      }
    },
  },
};

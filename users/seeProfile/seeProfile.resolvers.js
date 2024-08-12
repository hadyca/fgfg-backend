import db from "../../db";

export default {
  Query: {
    seeProfile: (_, { userId }) => {
      try {
        const user = db.user.findUnique({
          where: { id: userId },
        });
        return user;
      } catch (error) {
        return error;
      }
    },
  },
};

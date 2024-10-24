import client from "../../client";

export default {
  Query: {
    seeUserProfile: async (_, { userId }) => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      try {
        const user = await client.user.findUnique({
          where: { id: userId },
        });
        return user;
      } catch (error) {
        return error;
      }
    },
  },
};

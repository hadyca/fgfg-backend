import client from "../../client";

export default {
  Query: {
    checkUsername: async (_, { username }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (user) {
          return {
            ok: false,
            error: "There is a duplicate username.",
          };
        }
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

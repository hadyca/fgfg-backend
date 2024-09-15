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
            error: "중복된 유저명이 있습니다.",
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

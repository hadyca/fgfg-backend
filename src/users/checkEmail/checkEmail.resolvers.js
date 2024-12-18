import client from "../../client";

export default {
  Query: {
    checkEmail: async (_, { email }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          return {
            ok: false,
            error: "There is a duplicate email address.",
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

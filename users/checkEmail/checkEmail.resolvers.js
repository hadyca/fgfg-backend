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
            error: "중복된 이메일주소가 있습니다.",
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

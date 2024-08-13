import db from "../../db";

export default {
  Query: {
    checkEmail: async (_, { email }) => {
      try {
        const user = await db.user.findUnique({
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

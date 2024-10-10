import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Query: {
    checkPassword: async (_, { password }, { loggedInUser }) => {
      try {
        const user = await client.user.findUnique({
          where: { id: loggedInUser.id },
        });

        if (!user) {
          return {
            ok: false,
            error: "존재 하지 않는 유저 입니다.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "비밀번호가 틀렸습니다.",
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

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await db.user.findUnique({
          where: { email },
          include: {
            guide: true,
          },
        });

        if (!user) {
          return {
            ok: false,
            error: "존재 하지 않는 이메일주소 입니다.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "비밀번호가 틀렸습니다.",
          };
        }
        const isGuide = Boolean(user.guide);
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY);

        return {
          ok: true,
          token,
          isGuide,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

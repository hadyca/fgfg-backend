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

        //승인된 가이드만 guideId 발급
        const guide = await db.guide.findUnique({
          where: {
            userId: user.id,
            isApproved: true,
          },
        });

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY);

        return {
          ok: true,
          token,
          ...(guide && { guideId: guide.id }), // guide가 존재하면 guideId를 리턴 객체에 추가
        };
      } catch (error) {
        return error;
      }
    },
  },
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await client.user.findUnique({
          where: { email },
          include: {
            guide: true,
          },
        });

        if (!user) {
          return {
            ok: false,
            error: "Email address does not exist.",
          };
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }

        //승인된 가이드만 guideId 발급
        const guide = await client.guide.findUnique({
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

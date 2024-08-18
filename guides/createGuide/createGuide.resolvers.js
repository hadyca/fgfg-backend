import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createGuide: protectedResolver(
      async (_, { fullname }, { loggedInUser }) => {
        try {
          const existingUser = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (existingUser) {
            return {
              ok: false,
              error: "이미 가입된 가이드 입니다.",
            };
          }

          await db.guide.create({
            data: {
              fullname,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });

          return {
            ok: true,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

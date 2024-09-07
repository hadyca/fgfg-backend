import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createGuide: protectedResolver(
      async (
        _,
        {
          fullname,
          birthdate,
          height,
          address,
          phone,
          resumePhoto,
          selfIntro,
          language,
        },
        { loggedInUser }
      ) => {
        try {
          const existingUser = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (existingUser) {
            return {
              ok: false,
              error: "이미 가입된 유저 입니다.",
            };
          }

          await db.guide.create({
            data: {
              fullname,
              birthdate,
              height,
              address,
              phone,
              resumePhoto,
              selfIntro,
              language: JSON.stringify(language),
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
          return {
            ok: false,
            error: "오류가 발생했습니다.",
          };
        }
      }
    ),
  },
};

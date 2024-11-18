import client from "../../client";
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
          const existingUser = await client.guide.findUnique({
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

          await client.guide.create({
            data: {
              fullname,
              birthdate,
              height,
              address,
              phone,
              resumePhoto,
              selfIntro,
              language,
              isApproved: true,
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

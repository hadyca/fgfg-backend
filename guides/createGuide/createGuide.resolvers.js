import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createGuide: protectedResolver(
      async (
        _,
        { fullname, birthdate, address, phone, photo, selfIntro },
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
              address,
              phone,
              photo,
              selfIntro,
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

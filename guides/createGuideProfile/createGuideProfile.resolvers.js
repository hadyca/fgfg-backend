import db from "../../db";
import { protectedResolver } from "../../users/users.utils";
import { calculateAge } from "../../utils";

export default {
  Mutation: {
    createGuideProfile: protectedResolver(
      async (
        _,
        { photos, personality, height, guideIntro },
        { loggedInUser }
      ) => {
        try {
          const guide = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (!guide) {
            return {
              ok: false,
              error: "가이드가 아닙니다.",
            };
          }

          const age = calculateAge(guide.birthdate);

          const newGuideProfile = await db.guideProfile.create({
            data: {
              fullname: guide.fullname,
              age,
              personality,
              height,
              guideIntro,
              guide: {
                connect: {
                  id: guide.id,
                },
              },
            },
          });

          for (let value of photos) {
            await db.file.create({
              data: {
                fileUrl: value.url,
                guideProfile: {
                  connect: {
                    id: newGuideProfile.id,
                  },
                },
              },
            });
          }
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

import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createGuideProfile: protectedResolver(
      async (_, { photos, personality, guideIntro }, { loggedInUser }) => {
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

          const newGuideProfile = await db.guideProfile.create({
            data: {
              personality,
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

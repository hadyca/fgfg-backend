import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeMyGuideProfile: protectedResolver(async (_, __, { loggedInUser }) => {
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

        const guideProfile = await db.guideProfile.findUnique({
          where: {
            guideId: guide.id,
          },
          include: {
            photos: true,
          },
        });
        return guideProfile;
      } catch (error) {
        return error;
      }
    }),
  },
};

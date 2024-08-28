import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteGuideProfile: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const guide = db.guide.findUnique({
          where: {
            userId: loggedInUser.id,
          },
        });

        if (!guide) {
          ok: false;
          error: "가이드 계정이 아닙니다.";
        }

        await db.guideProfile.delete({
          where: {
            guideId: guide.id,
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
    }),
  },
};

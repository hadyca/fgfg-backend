import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteGuide: protectedResolver(async (_, { guideId }, { loggedInUser }) => {
      try {
        const isGuide = await db.guide.findUnique({
          where: {
            userId: loggedInUser.id,
          },
        });

        if (!isGuide) {
          return {
            ok: false,
            error: "본인 계정이 아닙니다.",
          };
        }

        const existingGuide = await db.guide.findUnique({
          where: {
            id: guideId,
          },
        });
        if (!existingGuide) {
          return {
            ok: false,
            error: "존재 하지 않는 계정 입니다.",
          };
        }

        await db.guide.delete({
          where: {
            userId: loggedInUser.id,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    }),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteGuide: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        await client.guide.delete({
          where: {
            userId: loggedInUser.id,
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

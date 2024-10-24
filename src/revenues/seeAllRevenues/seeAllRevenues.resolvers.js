import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeAllRevenues: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const guide = await client.guide.findUnique({
          where: {
            userId: loggedInUser.id,
          },
        });

        if (!guide) {
          return;
        }
        const revenues = await client.revenue.findMany({
          where: {
            guideId: guide.id,
          },
        });
        return revenues;
      } catch (error) {
        return error;
      }
    }),
  },
};

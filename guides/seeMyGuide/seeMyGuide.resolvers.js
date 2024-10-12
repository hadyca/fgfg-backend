import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeMyGuide: protectedResolver(async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: { userId: loggedInUser.id },
        include: {
          guidePhotos: true,
        },
      });
      return guide;
    }),
  },
};

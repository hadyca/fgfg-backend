import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
          include: {
            guide: true,
            chatRooms: {
              include: {
                users: true,
              },
            },
          },
        });

        if (!user) {
          throw new Error("This is not your account.");
        } else {
          return user;
        }
      } catch (error) {
        return error;
      }
    }),
  },
};

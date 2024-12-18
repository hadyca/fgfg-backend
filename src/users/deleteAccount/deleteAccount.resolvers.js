import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (_, __, { loggedInUser }) => {
      const existingUser = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
      if (!existingUser) {
        return {
          ok: false,
          error: "The account does not exist.",
        };
      }
      await client.user.delete({
        where: {
          id: loggedInUser.id,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

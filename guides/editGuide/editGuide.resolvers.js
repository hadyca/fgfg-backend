import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editGuide: protectedResolver(
      async (_, { fullname: newFullname }, { loggedInUser }) => {
        try {
          await db.guide.update({
            where: { userId: loggedInUser.id },
            data: {
              ...(newFullname && { fullname: newFullname }),
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

import db from "../../db";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const user = await db.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });
        if (!user) {
          throw new Error("본인 계정이 아닙니다.");
        } else {
          return user;
        }
      } catch (error) {
        return error;
      }
    }),
  },
};

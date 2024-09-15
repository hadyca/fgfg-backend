import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(
      async (_, { userId }, { loggedInUser }) => {
        try {
          if (userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "본인 계정이 아닙니다.",
            };
          }
          const existingUser = await client.user.findUnique({
            where: {
              id: userId,
            },
          });
          if (!existingUser) {
            return {
              ok: false,
              error: "존재 하지 않는 계정 입니다.",
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
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editUserProfile: protectedResolver(
      async (
        _,
        {
          username: newUsername,
          email: newEamil,
          avatar: newAvatar,
          password: newPassword,
        },
        { loggedInUser }
      ) => {
        try {
          if (newUsername) {
            const existingUsername = await client.user.findUnique({
              where: {
                username: newUsername,
              },
            });

            if (existingUsername) {
              return {
                ok: false,
                error: "유저네임이 중복됩니다.",
              };
            }
          }

          if (newEamil) {
            const existingEmail = await client.user.findUnique({
              where: {
                email: newEamil,
              },
            });

            if (existingEmail) {
              return {
                ok: false,
                error: "이메일이 중복됩니다.",
              };
            }
          }

          let uglyPassword = null;
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10);
          }
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              ...(newUsername && { username: newUsername }),
              ...(newEamil && { email: newEamil }),
              ...(uglyPassword && { password: uglyPassword }),
              ...(newAvatar && { avatar: newAvatar }),
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

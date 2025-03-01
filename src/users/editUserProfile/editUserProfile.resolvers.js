import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import extractId from "../../lib/extractId";
import deleteCloudflareImage from "../../lib/deleteCloudflareImage";

export default {
  Mutation: {
    editUserProfile: protectedResolver(
      async (
        _,
        {
          username: newUsername,
          email: newEmail,
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
                error: "Username already exists.",
              };
            }
          }

          if (newEmail) {
            const existingEmail = await client.user.findUnique({
              where: {
                email: newEmail,
              },
            });

            if (existingEmail) {
              return {
                ok: false,
                error: "Email already exists.",
              };
            }
          }

          if (newAvatar) {
            const user = await client.user.findUnique({
              where: {
                id: loggedInUser.id,
              },
            });
            if (user.avatar) {
              const cloudeImageId = extractId(user.avatar);
              await deleteCloudflareImage(cloudeImageId);
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
              ...(newEmail && { email: newEmail }),
              ...(uglyPassword && { password: uglyPassword }),
              ...(newAvatar && { avatar: newAvatar }),
            },
          });

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: "An error occurred.",
          };
        }
      }
    ),
  },
};

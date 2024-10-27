import client from "../../client";
import { sendEmail } from "../../lib/sendEmail";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        await sendEmail("rlawpgud86@naver.com");

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

import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editGuide: protectedResolver(
      async (
        _,
        { fullname, birthdate, address, phone, photo, selfIntro, language },
        { loggedInUser }
      ) => {
        try {
          await db.guide.update({
            where: { userId: loggedInUser.id },
            data: {
              fullname,
              birthdate,
              address,
              phone,
              photo,
              selfIntro,
              language,
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: "오류가 발생했습니다.",
          };
        }
      }
    ),
  },
};

import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Query: {
    checkPassword: async (_, { password }, { loggedInUser }) => {
      try {
        const user = await client.user.findUnique({
          where: { id: loggedInUser.id },
        });

        if (!user) {
          return {
            ok: false,
            error: "User does not exist.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

require("dotenv").config();
import bcrypt from "bcrypt";
import db from "../../db";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const existingUser = await db.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 있는 계정입니다.",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
          data: {
            username,
            email,
            password: uglyPassword,
          },
        });
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY);

        return {
          ok: true,
          token,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

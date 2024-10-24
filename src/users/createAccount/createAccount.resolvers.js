require("dotenv").config();
import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const uglyPassword = await bcrypt.hash(password, 10);

        const user = await client.user.create({
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

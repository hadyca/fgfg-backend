import jwt from "jsonwebtoken";
import db from "../db";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await db.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인 해주세요.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };

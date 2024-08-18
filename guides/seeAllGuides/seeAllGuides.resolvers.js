import db from "../../db";

export default {
  Query: {
    seeAllGuides: async () => {
      try {
        const guides = await db.guide.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
        return guides;
      } catch (error) {
        return error;
      }
    },
  },
};

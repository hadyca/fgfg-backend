import client from "../../client";

export default {
  Query: {
    seeAllGuides: async () => {
      try {
        const guides = await client.guide.findMany({
          where: {
            isApproved: true,
          },
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

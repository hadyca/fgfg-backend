import db from "../../db";

export default {
  Query: {
    seeGuide: async (_, { guideId }) => {
      try {
        const guide = await db.guide.findUnique({
          where: { id: guideId },
          include: {
            guidePhotos: {
              orderBy: {
                fileUrlOrder: "asc",
              },
            },
            reservations: {
              orderBy: {
                startTime: "asc",
              },
            },
          },
        });

        return guide;
      } catch (error) {
        return error;
      }
    },
  },
};

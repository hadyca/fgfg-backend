import client from "../../client";

export default {
  Query: {
    seeGuide: async (_, { guideId }) => {
      try {
        const guide = await client.guide.findUnique({
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
            user: {
              select: {
                avatar: true,
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

import db from "../../db";

export default {
  Query: {
    seeGuide: async (_, { guideId }) => {
      try {
        const guide = await db.guide.findUnique({
          where: { id: guideId },
          include: {
            guidePhotos: true,
          },
        });

        // guidePhotos 배열을 fileUrlOrder 순서로 정렬
        if (guide && guide.guidePhotos) {
          guide.guidePhotos.sort((a, b) => a.fileUrlOrder - b.fileUrlOrder);
        }

        return guide;
      } catch (error) {
        return error;
      }
    },
  },
};

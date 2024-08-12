import db from "../../db";

export default {
  Query: {
    seeGuide: (_, { guideId }) => {
      try {
        const guide = db.guide.findUnique({
          where: { id: guideId },
        });
        return guide;
      } catch (error) {
        return error;
      }
    },
  },
};

import db from "../../db";

export default {
  Query: {
    seeGuideProfile: (_, { guideId }) => {
      try {
        const guideProfile = db.guideProfile.findUnique({
          where: { guideId },
        });
        return guideProfile;
      } catch (error) {
        return error;
      }
    },
  },
};

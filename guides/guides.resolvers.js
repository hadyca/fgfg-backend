import db from "../db";

export default {
  Guide: {
    mainGuidePhoto: ({ id }) => {
      const file = db.file.findFirst({
        where: {
          guideId: id,
          fileUrlOrder: 1,
        },
      });
      return file;
    },
  },
};

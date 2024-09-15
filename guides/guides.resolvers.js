import client from "../client";

export default {
  Guide: {
    mainGuidePhoto: ({ id }) => {
      const file = client.file.findFirst({
        where: {
          guideId: id,
          fileUrlOrder: 1,
        },
      });
      return file;
    },
  },
};

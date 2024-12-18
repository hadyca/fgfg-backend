import client from "../../client";

export default {
  Mutation: {
    createReportGuide: async (_, { guideId, reason }, { loggedInUser }) => {
      try {
        const guide = client.guide.findUnique({
          where: {
            id: guideId,
          },
          select: {
            id: true,
          },
        });
        if (!guide) {
          return {
            ok: false,
            error: "Guide does not exist.",
          };
        }
        await client.reportGuide.create({
          data: {
            reason,
            toGuide: {
              connect: {
                id: guideId,
              },
            },
            ...(loggedInUser && {
              fromUser: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            }),
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Failed to report guide.",
        };
      }
    },
  },
};

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
            error: "존재 하지 않는 가이드 입니다.",
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
          error: "가이드 신고에 실패했습니다.",
        };
      }
    },
  },
};

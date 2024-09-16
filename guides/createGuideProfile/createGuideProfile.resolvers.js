import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createGuideProfile: protectedResolver(
      async (
        _,
        {
          guidePhotos,
          personality,
          guideIntro,
          pickupPlaceMain,
          pickupPlaceLat,
          pickupPlaceLng,
          pickupPlaceDetail,
        },
        { loggedInUser }
      ) => {
        try {
          const guide = await client.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          if (!guide) {
            return {
              ok: false,
              error: "가이드가 아닙니다.",
            };
          }

          await client.guide.update({
            where: {
              id: guide.id,
            },
            data: {
              personality,
              guideIntro,
              pickupPlaceMain,
              pickupPlaceDetail,
              pickupPlaceLat,
              pickupPlaceLng,
            },
          });

          for (let guidePhoto of guidePhotos) {
            await client.file.create({
              data: {
                fileUrl: guidePhoto.url,
                fileUrlOrder: guidePhoto.id,
                guide: {
                  connect: {
                    id: guide.id,
                  },
                },
              },
            });
          }

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: "오류가 발생했습니다.",
          };
        }
      }
    ),
  },
};

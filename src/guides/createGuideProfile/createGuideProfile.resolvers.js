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
              error: "You are not a guide.",
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
                fileUrl: guidePhoto.fileUrl,
                fileUrlOrder: guidePhoto.fileUrlOrder,
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
            error: "An error has occurred.",
          };
        }
      }
    ),
  },
};

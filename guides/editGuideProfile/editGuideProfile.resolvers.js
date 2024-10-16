import client from "../../client";
import deleteCloudflareImage from "../../lib/deleteCloudflareImage";
import extractId from "../../lib/extractId";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editGuideProfile: protectedResolver(
      async (
        _,
        {
          fullname,
          birthdate,
          height,
          address,
          phone,
          language,
          guidePhotos,
          personality,
          guideIntro,
          pickupPlaceMain,
          pickupPlaceLat,
          pickupPlaceLng,
          pickupPlaceDetail,
          isActive,
          bankname,
          bankAccount,
        },
        { loggedInUser }
      ) => {
        try {
          const updatedGuide = await client.guide.update({
            where: { userId: loggedInUser.id },
            data: {
              ...(fullname && { fullname }),
              ...(birthdate && { birthdate }),
              ...(height && { height }),
              ...(address && { address }),
              ...(phone && { phone }),
              ...(language && { language: JSON.stringify(language) }),
              ...(personality && { personality }),
              ...(guideIntro && { guideIntro }),
              ...(pickupPlaceMain && { pickupPlaceMain }),
              ...(pickupPlaceLat && { pickupPlaceLat }),
              ...(pickupPlaceLng && { pickupPlaceLng }),
              ...(pickupPlaceDetail && { pickupPlaceDetail }),
              ...(isActive !== undefined && { isActive }),
              ...(bankname && { bankname }),
              ...(bankAccount && { bankAccount }),
            },
          });

          if (guidePhotos) {
            // 1. 해당 가이드의 모든 기존 파일을 조회
            const existingPhotos = await client.file.findMany({
              where: { guideId: updatedGuide.id },
            });

            // 2. 새로운 guidePhotos 배열에서 fileUrlOrder만 추출
            const newFileUrlOrders = guidePhotos.map(
              (photo) => photo.fileUrlOrder
            );

            // 3. 기존 파일 중 새로운 데이터에 없는 항목을 삭제
            const photosToDelete = existingPhotos.filter(
              (photo) => !newFileUrlOrders.includes(photo.fileUrlOrder)
            );

            for (let photo of photosToDelete) {
              const deletedFile = await client.file.delete({
                where: { id: photo.id },
              });
              const cloudeImageId = extractId(deletedFile.fileUrl);
              await deleteCloudflareImage(cloudeImageId);
            }
            for (let guidePhoto of guidePhotos) {
              const existingPhoto = await client.file.findFirst({
                where: {
                  guideId: updatedGuide.id,
                  fileUrlOrder: guidePhoto.fileUrlOrder,
                },
              });

              if (existingPhoto) {
                const cloudeImageId = extractId(existingPhoto.fileUrl);
                await deleteCloudflareImage(cloudeImageId);

                await client.file.update({
                  where: {
                    id: existingPhoto.id,
                  },
                  data: {
                    fileUrl: guidePhoto.fileUrl,
                  },
                });
              } else {
                await client.file.create({
                  data: {
                    fileUrl: guidePhoto.fileUrl,
                    fileUrlOrder: guidePhoto.fileUrlOrder,
                    guide: {
                      connect: {
                        id: updatedGuide.id,
                      },
                    },
                  },
                });
              }
            }
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

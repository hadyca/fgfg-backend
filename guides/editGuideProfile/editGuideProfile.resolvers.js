import client from "../../client";
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
              ...(language && { language }),
              ...(guidePhotos && { guidePhotos }),
              ...(personality && { personality }),
              ...(guideIntro && { guideIntro }),
              ...(pickupPlaceMain && { pickupPlaceMain }),
              ...(pickupPlaceLat && { pickupPlaceLat }),
              ...(pickupPlaceLng && { pickupPlaceLng }),
              ...(pickupPlaceDetail && { pickupPlaceDetail }),
            },
          });

          if (guidePhotos) {
            // 기존 사진 가져오기
            const existingPhotos = await client.file.findMany({
              where: {
                guideId: updatedGuide.id,
              },
            });

            // 기존 파일의 URL과 새로 들어온 사진 URL을 비교
            const existingPhotoUrls = existingPhotos.map(
              (photo) => photo.fileUrl
            );
            const newPhotoUrls = guidePhotos.map((photo) => photo.url);

            // 삭제할 사진 추출
            const photosToDelete = existingPhotos.filter(
              (photo) => !newPhotoUrls.includes(photo.fileUrl)
            );

            // 추가할 사진 추출
            const photosToAdd = guidePhotos.filter(
              (photo) => !existingPhotoUrls.includes(photo.url)
            );

            // 삭제할 사진 제거
            for (let photo of photosToDelete) {
              await client.file.delete({
                where: { id: photo.id },
              });
            }
            // 추가할 사진 생성
            for (let newPhoto of photosToAdd) {
              await client.file.create({
                data: {
                  fileUrl: newPhoto.url,
                  guide: {
                    connect: {
                      id: updatedGuide.id,
                    },
                  },
                },
              });
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

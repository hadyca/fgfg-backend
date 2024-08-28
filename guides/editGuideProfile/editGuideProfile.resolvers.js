import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editGuideProfile: protectedResolver(
      async (
        _,
        { photos, personality, height, guideIntro },
        { loggedInUser }
      ) => {
        // to-be: 프론트단에서 사진 변경 시, 클라우드 클레어 이미지 삭제 해야함
        try {
          const guide = await db.guide.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });

          const newGuideProfile = await db.guideProfile.update({
            where: {
              guideId: guide.id,
            },
            data: {
              personality,
              height,
              guideIntro,
            },
          });

          // 기존 사진 가져오기
          const existingPhotos = await db.file.findMany({
            where: {
              guideProfileId: newGuideProfile.id,
            },
          });

          // 기존 파일의 URL과 새로 들어온 사진 URL을 비교
          const existingPhotoUrls = existingPhotos.map(
            (photo) => photo.fileUrl
          );
          const newPhotoUrls = photos.map((photo) => photo.url);

          // 삭제할 사진 추출
          const photosToDelete = existingPhotos.filter(
            (photo) => !newPhotoUrls.includes(photo.fileUrl)
          );

          // 추가할 사진 추출
          const photosToAdd = photos.filter(
            (photo) => !existingPhotoUrls.includes(photo.url)
          );

          // 삭제할 사진 제거
          for (let photo of photosToDelete) {
            await db.file.delete({
              where: { id: photo.id },
            });
          }
          // 추가할 사진 생성
          for (let value of photosToAdd) {
            await db.file.create({
              data: {
                fileUrl: value.url,
                guideProfile: {
                  connect: {
                    id: newGuideProfile.id,
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

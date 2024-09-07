import db from "../../db";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editGuide: protectedResolver(
      async (
        _,
        {
          fullname,
          birthdate,
          address,
          phone,
          photo,
          selfIntro,
          language,
          guidePhotos,
          personality,
          guideIntro,
        },
        { loggedInUser }
      ) => {
        try {
          const updatedGuide = await db.guide.update({
            where: { userId: loggedInUser.id },
            data: {
              fullname,
              birthdate,
              address,
              phone,
              photo,
              selfIntro,
              language,
              personality,
              guideIntro,
            },
          });

          // 기존 사진 가져오기
          const existingPhotos = await db.file.findMany({
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
            await db.file.delete({
              where: { id: photo.id },
            });
          }
          // 추가할 사진 생성
          for (let newPhoto of photosToAdd) {
            await db.file.create({
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

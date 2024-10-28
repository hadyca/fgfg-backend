import client from "../../client";
import { sendRejectionEmail } from "../../lib/sendEmail";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    guideCancelReservation: protectedResolver(
      async (_, { reservationId }, { loggedInUser }) => {
        const reservation = await client.reservation.findFirst({
          where: {
            id: reservationId,
          },
        });

        const guide = await client.guide.findUnique({
          where: {
            userId: loggedInUser.id,
          },
          select: {
            id: true,
          },
        });

        if (guide.id !== reservation.guideId) {
          return {
            ok: false,
            error: "잘못된 사용자 입니다.",
          };
        }
        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "예약 시작 시간 전에 취소 해야 합니다.",
          };
        }

        const newReservation = await client.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            guideCancel: true,
          },
          include: {
            user: true,
            guide: true,
          },
        });

        const mainGuidePhoto = await client.file.findFirst({
          where: {
            guideId: newReservation.guide.id,
            fileUrlOrder: 1,
          },
          select: {
            fileUrl: true,
          },
        });

        await sendRejectionEmail(
          newReservation.user.email,
          mainGuidePhoto.fileUrl,
          newReservation.guide.fullname,
          newReservation.startTime,
          newReservation.endTime,
          newReservation.serviceFee
        );
        return {
          ok: true,
        };
      }
    ),
  },
};

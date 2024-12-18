import client from "../../client";
import { sendRejectionEmail } from "../../lib/sendEmail";
import { calculateAge } from "../../lib/utils";
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
            error: "Invalid user.",
          };
        }
        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "Reservation must be cancelled before the start time.",
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
        const guideAge = calculateAge(newReservation.guide.birthdate);

        await sendRejectionEmail(
          newReservation.user.email,
          mainGuidePhoto.fileUrl,
          newReservation.guide.fullname,
          newReservation.startTime,
          newReservation.endTime,
          newReservation.serviceFee,
          newReservation.id,
          newReservation.pickupPlaceMain,
          newReservation.pickupPlaceDetail,
          guideAge
        );
        return {
          ok: true,
        };
      }
    ),
  },
};

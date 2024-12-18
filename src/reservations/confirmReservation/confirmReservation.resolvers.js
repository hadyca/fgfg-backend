import client from "../../client";
import getExchangeRate from "../../lib/getExchangeRate";
import { sendConfirmEmail } from "../../lib/sendEmail";
import { calculateAge } from "../../lib/utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    confirmReservation: protectedResolver(
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

        if (reservation.userCancel) {
          return {
            ok: false,
            error: "Customer has already cancelled the reservation.",
          };
        }

        const currentTime = new Date();

        if (currentTime > reservation.startTime) {
          return {
            ok: false,
            error: "Reservation must be accepted before the start time.",
          };
        }

        const revenue = await client.revenue.findUnique({
          where: {
            reservationId,
          },
          select: {
            id: true,
          },
        });

        if (revenue) {
          return {
            ok: false,
            error: "Revenue data already exists.",
          };
        }

        const newReservation = await client.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            guideConfirm: true,
          },
          include: {
            user: true,
            guide: true,
          },
        });

        const vndRate = await getExchangeRate();
        if (!vndRate) {
          return {
            ok: false,
            error: "Unable to fetch exchange rate information.",
          };
        }

        const calculateRevenue = (reservation.serviceFee / 2) * vndRate;

        await client.revenue.create({
          data: {
            amount: calculateRevenue,
            reservation: {
              connect: {
                id: reservationId,
              },
            },
            guide: {
              connect: {
                id: guide.id,
              },
            },
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

        await sendConfirmEmail(
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

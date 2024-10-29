import client from "../client";
import { DateTime } from "luxon";

export default {
  Guide: {
    mainGuidePhoto: ({ id }) => {
      const file = client.file.findFirst({
        where: {
          guideId: id,
          fileUrlOrder: 1,
        },
      });
      return file;
    },
    totalAmount: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      const revenues = await client.revenue.findMany({
        where: {
          guideId: guide.id,
        },
        select: {
          amount: true,
        },
      });

      const totalAmount = revenues.reduce((acc, curr) => acc + curr.amount, 0);

      return totalAmount;
    },
    totalUnTransferredAmount: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      const revenues = await client.revenue.findMany({
        where: {
          guideId: guide.id,
          isTransfer: false,
        },
        select: {
          amount: true,
        },
      });

      const totalUnTransferredAmount = revenues.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      return totalUnTransferredAmount;
    },
    totalReservations: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      const totalReservations = await client.reservation.count({
        where: {
          guideId: guide.id,
          guideConfirm: true,
        },
      });

      return totalReservations;
    },
    totalGuideTime: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      const reservations = await client.reservation.findMany({
        where: {
          guideId: guide.id,
          guideConfirm: true,
        },
      });
      // 각 reservation의 startTime과 endTime을 사용하여 총 가이드 시간 계산
      const totalGuideTime = reservations.reduce((total, reservation) => {
        const startTime = new Date(reservation.startTime);
        const endTime = new Date(reservation.endTime);
        const duration =
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // 밀리초를 시간으로 변환
        return total + duration;
      }, 0);

      return totalGuideTime;
    },
    oneMonthRevenue: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      if (!guide) {
        throw new Error("Guide not found");
      }

      // 오늘 날짜 기준 UTC에서 현재 월의 1일과 마지막 날 계산
      const today = DateTime.now().setZone("utc");
      const firstDayOfMonthUTC = today.startOf("month").toUTC(); // 이번 달 1일 00:00:00 UTC
      const lastDayOfMonthUTC = today.endOf("month").toUTC(); // 이번 달 마지막 날 23:59:59 UTC

      // 해당 월의 수익 조회
      const revenues = await client.revenue.findMany({
        where: {
          guideId: guide.id,
          createdAt: {
            gte: firstDayOfMonthUTC.toJSDate(), // UTC 기준 이번 달 1일
            lte: lastDayOfMonthUTC.toJSDate(), // UTC 기준 이번 달 마지막 날
          },
        },
        select: {
          createdAt: true,
          amount: true, // 수익 필드
        },
      });

      // 날짜 배열 생성 (이번 달 1일부터 마지막 날까지)
      const dateArray = [];
      for (
        let d = firstDayOfMonthUTC;
        d <= lastDayOfMonthUTC;
        d = d.plus({ days: 1 })
      ) {
        dateArray.push(d.toISODate()); // "yyyy-MM-dd" 형식으로 변환
      }

      // 각 날짜별 수익 계산
      const revenueByDate = revenues.reduce((acc, revenue) => {
        const date = DateTime.fromJSDate(revenue.createdAt).toISODate(); // createdAt을 UTC 날짜 형식으로 변환
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += revenue.amount; // 해당 날짜의 수익 더하기
        return acc;
      }, {});

      // 각 날짜별로 수익 배열 생성 (없으면 0으로 설정)
      const oneMonthRevenueArray = dateArray.map((date) => ({
        date,
        amount: revenueByDate[date] || 0, // 수익이 없으면 0으로 설정
      }));
      return oneMonthRevenueArray;
    },
    totalThisMonthRevenue: async (_, __, { loggedInUser }) => {
      const guide = await client.guide.findUnique({
        where: {
          userId: loggedInUser.id,
        },
      });

      if (!guide) {
        throw new Error("Guide not found");
      }

      // 오늘 날짜 기준 UTC에서 현재 월의 1일과 마지막 날 계산
      const today = DateTime.now().setZone("utc");
      const firstDayOfMonthUTC = today.startOf("month").toUTC(); // 이번 달 1일 00:00:00 UTC
      const lastDayOfMonthUTC = today.endOf("month").toUTC(); // 이번 달 마지막 날 23:59:59 UTC

      // 해당 월의 수익 조회
      const revenues = await client.revenue.findMany({
        where: {
          guideId: guide.id,
          createdAt: {
            gte: firstDayOfMonthUTC.toJSDate(), // UTC 기준 이번 달 1일
            lte: lastDayOfMonthUTC.toJSDate(), // UTC 기준 이번 달 마지막 날
          },
        },
        select: {
          amount: true, // 수익 필드
        },
      });

      // 총 수익 계산
      const totalRevenue = revenues.reduce(
        (total, revenue) => total + revenue.amount,
        0
      );

      return totalRevenue;
    },
  },
};

/*
  Warnings:

  - You are about to drop the column `paymentIntentId` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "paymentIntentId",
ADD COLUMN     "isDeposited" BOOLEAN NOT NULL DEFAULT false;

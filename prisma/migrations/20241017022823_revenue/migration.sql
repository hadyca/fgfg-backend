/*
  Warnings:

  - A unique constraint covering the columns `[reservationId]` on the table `Revenue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Revenue_reservationId_key" ON "Revenue"("reservationId");

/*
  Warnings:

  - A unique constraint covering the columns `[guideId,fileUrlOrder]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "serviceFee" INTEGER NOT NULL,
    "customerAgeRange" TEXT NOT NULL DEFAULT 'd',
    "guideConfirm" BOOLEAN NOT NULL DEFAULT false,
    "userCancel" BOOLEAN NOT NULL DEFAULT false,
    "guideCancel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "endTime", "guideCancel", "guideConfirm", "guideId", "id", "serviceFee", "startTime", "updatedAt", "userCancel", "userId") SELECT "createdAt", "endTime", "guideCancel", "guideConfirm", "guideId", "id", "serviceFee", "startTime", "updatedAt", "userCancel", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "File_guideId_fileUrlOrder_key" ON "File"("guideId", "fileUrlOrder");

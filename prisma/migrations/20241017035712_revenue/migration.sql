-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL,
    "guideId" INTEGER,
    "userId" INTEGER,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "serviceFee" INTEGER NOT NULL,
    "customerAgeRange" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "guideConfirm" BOOLEAN NOT NULL DEFAULT false,
    "userCancel" BOOLEAN NOT NULL DEFAULT false,
    "guideCancel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "customerAgeRange", "endTime", "guideCancel", "guideConfirm", "guideId", "id", "paymentIntentId", "serviceFee", "startTime", "updatedAt", "userCancel", "userId") SELECT "createdAt", "customerAgeRange", "endTime", "guideCancel", "guideConfirm", "guideId", "id", "paymentIntentId", "serviceFee", "startTime", "updatedAt", "userCancel", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
CREATE TABLE "new_Revenue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "revenue" INTEGER NOT NULL,
    "reservationId" INTEGER,
    "guideId" INTEGER,
    "isTransfer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Revenue_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Revenue_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Revenue" ("createdAt", "guideId", "id", "isTransfer", "reservationId", "revenue", "updatedAt") SELECT "createdAt", "guideId", "id", "isTransfer", "reservationId", "revenue", "updatedAt" FROM "Revenue";
DROP TABLE "Revenue";
ALTER TABLE "new_Revenue" RENAME TO "Revenue";
CREATE UNIQUE INDEX "Revenue_reservationId_key" ON "Revenue"("reservationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

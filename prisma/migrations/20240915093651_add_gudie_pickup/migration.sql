-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resumePhoto" TEXT NOT NULL,
    "selfIntro" TEXT NOT NULL,
    "language" TEXT,
    "personality" TEXT,
    "guideIntro" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "pickupPlaceMain" TEXT NOT NULL,
    "pickupPlaceDetail" TEXT,
    "pickupPlaceLatitude" TEXT NOT NULL,
    "pickupPlaceLongitude" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guide" ("address", "birthdate", "createdAt", "fullname", "guideIntro", "height", "id", "isActive", "isApproved", "language", "personality", "phone", "pickupPlaceDetail", "pickupPlaceLatitude", "pickupPlaceLongitude", "pickupPlaceMain", "resumePhoto", "selfIntro", "updatedAt", "userId") SELECT "address", "birthdate", "createdAt", "fullname", "guideIntro", "height", "id", "isActive", "isApproved", "language", "personality", "phone", "pickupPlaceDetail", "pickupPlaceLatitude", "pickupPlaceLongitude", "pickupPlaceMain", "resumePhoto", "selfIntro", "updatedAt", "userId" FROM "Guide";
DROP TABLE "Guide";
ALTER TABLE "new_Guide" RENAME TO "Guide";
CREATE UNIQUE INDEX "Guide_userId_key" ON "Guide"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

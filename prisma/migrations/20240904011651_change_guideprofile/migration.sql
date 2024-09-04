/*
  Warnings:

  - You are about to drop the column `age` on the `GuideProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `GuideProfile` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `GuideProfile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuideProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guideId" INTEGER NOT NULL,
    "personality" TEXT NOT NULL,
    "guideIntro" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GuideProfile_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GuideProfile" ("createdAt", "guideId", "guideIntro", "id", "isActive", "personality", "updatedAt") SELECT "createdAt", "guideId", "guideIntro", "id", "isActive", "personality", "updatedAt" FROM "GuideProfile";
DROP TABLE "GuideProfile";
ALTER TABLE "new_GuideProfile" RENAME TO "GuideProfile";
CREATE UNIQUE INDEX "GuideProfile_guideId_key" ON "GuideProfile"("guideId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

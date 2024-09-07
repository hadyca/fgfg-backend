/*
  Warnings:

  - You are about to drop the `GuideProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `guideProfileId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Guide` table. All the data in the column will be lost.
  - Added the required column `guideId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumePhoto` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GuideProfile_guideId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GuideProfile";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileUrl" TEXT NOT NULL,
    "fileUrlOrder" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "File_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "fileUrl", "fileUrlOrder", "id", "updatedAt") SELECT "createdAt", "fileUrl", "fileUrlOrder", "id", "updatedAt" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guide" ("address", "birthdate", "createdAt", "fullname", "height", "id", "isApproved", "language", "phone", "selfIntro", "updatedAt", "userId") SELECT "address", "birthdate", "createdAt", "fullname", "height", "id", "isApproved", "language", "phone", "selfIntro", "updatedAt", "userId" FROM "Guide";
DROP TABLE "Guide";
ALTER TABLE "new_Guide" RENAME TO "Guide";
CREATE UNIQUE INDEX "Guide_userId_key" ON "Guide"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

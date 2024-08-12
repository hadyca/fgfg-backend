/*
  Warnings:

  - You are about to drop the column `name` on the `Guide` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guide" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Guide";
DROP TABLE "Guide";
ALTER TABLE "new_Guide" RENAME TO "Guide";
CREATE UNIQUE INDEX "Guide_fullname_key" ON "Guide"("fullname");
CREATE UNIQUE INDEX "Guide_userId_key" ON "Guide"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

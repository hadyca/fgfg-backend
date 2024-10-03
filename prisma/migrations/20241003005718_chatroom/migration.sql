/*
  Warnings:

  - You are about to drop the column `reJoinedAt` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "normalUserId" INTEGER NOT NULL,
    "normalUserRejoinedAt" DATETIME,
    "guideUserId" INTEGER NOT NULL,
    "guideUserRejoinedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ChatRoom" ("createdAt", "guideUserId", "id", "normalUserId", "updatedAt") SELECT "createdAt", "guideUserId", "id", "normalUserId", "updatedAt" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

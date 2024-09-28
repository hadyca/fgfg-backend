/*
  Warnings:

  - You are about to drop the `_ChatRoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `guideUserId` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_ChatRoomToUser_B_index";

-- DropIndex
DROP INDEX "_ChatRoomToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChatRoomToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "guideId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoom_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

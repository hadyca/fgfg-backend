-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuideReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "guideId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GuideReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GuideReport_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GuideReport" ("createdAt", "guideId", "id", "reason", "updatedAt", "userId") SELECT "createdAt", "guideId", "id", "reason", "updatedAt", "userId" FROM "GuideReport";
DROP TABLE "GuideReport";
ALTER TABLE "new_GuideReport" RENAME TO "GuideReport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Added the required column `user_id` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "plot" TEXT,
    "poster" TEXT,
    "tags" TEXT,
    "release_date" DATETIME,
    "genres" TEXT,
    "content_type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Content" ("content_type", "genres", "id", "last_update", "plot", "poster", "release_date", "tags", "title") SELECT "content_type", "genres", "id", "last_update", "plot", "poster", "release_date", "tags", "title" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

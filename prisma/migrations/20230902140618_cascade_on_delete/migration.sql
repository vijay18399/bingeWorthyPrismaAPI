-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "content_id" TEXT NOT NULL,
    CONSTRAINT "Season_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "Content" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("content_id", "description", "id", "number", "poster") SELECT "content_id", "description", "id", "number", "poster" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
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
    CONSTRAINT "Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Content" ("content_type", "genres", "id", "last_update", "plot", "poster", "release_date", "tags", "title", "user_id") SELECT "content_type", "genres", "id", "last_update", "plot", "poster", "release_date", "tags", "title", "user_id" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
CREATE TABLE "new_Episode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "air_date" DATETIME,
    "season_id" TEXT NOT NULL,
    CONSTRAINT "Episode_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("air_date", "description", "id", "number", "poster", "season_id") SELECT "air_date", "description", "id", "number", "poster", "season_id" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Reaction" (
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "content_id"),
    CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reaction_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "Content" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reaction" ("content_id", "reaction", "type", "user_id") SELECT "content_id", "reaction", "type", "user_id" FROM "Reaction";
DROP TABLE "Reaction";
ALTER TABLE "new_Reaction" RENAME TO "Reaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

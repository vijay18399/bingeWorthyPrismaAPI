-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "profile" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "plot" TEXT,
    "poster" TEXT,
    "tags" TEXT,
    "release_date" DATETIME,
    "genres" TEXT,
    "content_type" TEXT NOT NULL,
    "last_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "content_id" TEXT NOT NULL,
    CONSTRAINT "Season_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "poster" TEXT,
    "air_date" DATETIME,
    "season_id" TEXT NOT NULL,
    CONSTRAINT "Episode_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reaction" (
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "content_id"),
    CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reaction_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

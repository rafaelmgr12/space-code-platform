/*
  Warnings:

  - Made the column `ship_id` on table `pilots` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pilots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pilot_certification" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "credits" REAL NOT NULL,
    "location_planet" TEXT NOT NULL,
    "ship_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pilots_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pilots" ("age", "created_at", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id") SELECT "age", "created_at", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id" FROM "pilots";
DROP TABLE "pilots";
ALTER TABLE "new_pilots" RENAME TO "pilots";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

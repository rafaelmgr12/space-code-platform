/*
  Warnings:

  - You are about to drop the column `ship_id` on the `pilots` table. All the data in the column will be lost.
  - Added the required column `pilot_id` to the `ships` table without a default value. This is not possible if the table is not empty.

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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_pilots" ("age", "created_at", "credits", "id", "location_planet", "name", "pilot_certification") SELECT "age", "created_at", "credits", "id", "location_planet", "name", "pilot_certification" FROM "pilots";
DROP TABLE "pilots";
ALTER TABLE "new_pilots" RENAME TO "pilots";
CREATE TABLE "new_ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fuel_capacity" REAL NOT NULL,
    "fuel_level" REAL NOT NULL,
    "weight_capacity" REAL NOT NULL,
    "pilot_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ships_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ships" ("created_at", "fuel_capacity", "fuel_level", "id", "weight_capacity") SELECT "created_at", "fuel_capacity", "fuel_level", "id", "weight_capacity" FROM "ships";
DROP TABLE "ships";
ALTER TABLE "new_ships" RENAME TO "ships";
CREATE UNIQUE INDEX "ships_pilot_id_key" ON "ships"("pilot_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

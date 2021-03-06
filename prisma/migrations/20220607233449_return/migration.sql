/*
  Warnings:

  - The primary key for the `pilots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ships` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "origin_planet" TEXT NOT NULL,
    "destination_planet" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "resource_id" TEXT NOT NULL,
    "pilot_id" TEXT NOT NULL,
    CONSTRAINT "contracts_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contracts_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contracts" ("description", "destination_planet", "id", "origin_planet", "payload", "pilot_id", "resource_id", "value") SELECT "description", "destination_planet", "id", "origin_planet", "payload", "pilot_id", "resource_id", "value" FROM "contracts";
DROP TABLE "contracts";
ALTER TABLE "new_contracts" RENAME TO "contracts";
CREATE TABLE "new_pilots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pilot_certification" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "credits" REAL NOT NULL,
    "location_planet" TEXT NOT NULL,
    "ship_id" TEXT NOT NULL,
    CONSTRAINT "pilots_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pilots" ("age", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id") SELECT "age", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id" FROM "pilots";
DROP TABLE "pilots";
ALTER TABLE "new_pilots" RENAME TO "pilots";
CREATE TABLE "new_ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fuel_capacity" REAL NOT NULL,
    "fuel_level" REAL NOT NULL,
    "weight_capacity" REAL NOT NULL
);
INSERT INTO "new_ships" ("fuel_capacity", "fuel_level", "id", "weight_capacity") SELECT "fuel_capacity", "fuel_level", "id", "weight_capacity" FROM "ships";
DROP TABLE "ships";
ALTER TABLE "new_ships" RENAME TO "ships";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `resource_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_id` to the `pilots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_id` to the `pilots` table without a default value. This is not possible if the table is not empty.

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
    CONSTRAINT "contracts_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contracts" ("description", "destination_planet", "id", "origin_planet", "payload", "value") SELECT "description", "destination_planet", "id", "origin_planet", "payload", "value" FROM "contracts";
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
    "contract_id" TEXT NOT NULL,
    CONSTRAINT "pilots_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pilots_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pilots" ("age", "credits", "id", "location_planet", "name", "pilot_certification") SELECT "age", "credits", "id", "location_planet", "name", "pilot_certification" FROM "pilots";
DROP TABLE "pilots";
ALTER TABLE "new_pilots" RENAME TO "pilots";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

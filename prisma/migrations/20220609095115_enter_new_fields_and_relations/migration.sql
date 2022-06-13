/*
  Warnings:

  - You are about to drop the column `resource_id` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `contracts_id` to the `resources` table without a default value. This is not possible if the table is not empty.

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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME,
    "pilot_id" TEXT,
    CONSTRAINT "contracts_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contracts" ("created_at", "description", "destination_planet", "id", "origin_planet", "payload", "value") SELECT "created_at", "description", "destination_planet", "id", "origin_planet", "payload", "value" FROM "contracts";
DROP TABLE "contracts";
ALTER TABLE "new_contracts" RENAME TO "contracts";
CREATE TABLE "new_resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "contracts_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resources_contracts_id_fkey" FOREIGN KEY ("contracts_id") REFERENCES "contracts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_resources" ("created_at", "id", "name", "weight") SELECT "created_at", "id", "name", "weight" FROM "resources";
DROP TABLE "resources";
ALTER TABLE "new_resources" RENAME TO "resources";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

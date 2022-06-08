-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pilots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pilot_certification" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "credits" REAL NOT NULL,
    "location_planet" TEXT NOT NULL,
    "ship_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pilots_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pilots" ("age", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id") SELECT "age", "credits", "id", "location_planet", "name", "pilot_certification", "ship_id" FROM "pilots";
DROP TABLE "pilots";
ALTER TABLE "new_pilots" RENAME TO "pilots";
CREATE UNIQUE INDEX "pilots_pilot_certification_key" ON "pilots"("pilot_certification");
CREATE TABLE "new_resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_resources" ("id", "name", "weight") SELECT "id", "name", "weight" FROM "resources";
DROP TABLE "resources";
ALTER TABLE "new_resources" RENAME TO "resources";
CREATE TABLE "new_contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "origin_planet" TEXT NOT NULL,
    "destination_planet" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resource_id" TEXT NOT NULL,
    "pilot_id" TEXT NOT NULL,
    CONSTRAINT "contracts_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contracts_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contracts" ("description", "destination_planet", "id", "origin_planet", "payload", "pilot_id", "resource_id", "value") SELECT "description", "destination_planet", "id", "origin_planet", "payload", "pilot_id", "resource_id", "value" FROM "contracts";
DROP TABLE "contracts";
ALTER TABLE "new_contracts" RENAME TO "contracts";
CREATE TABLE "new_ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fuel_capacity" REAL NOT NULL,
    "fuel_level" REAL NOT NULL,
    "weight_capacity" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ships" ("fuel_capacity", "fuel_level", "id", "weight_capacity") SELECT "fuel_capacity", "fuel_level", "id", "weight_capacity" FROM "ships";
DROP TABLE "ships";
ALTER TABLE "new_ships" RENAME TO "ships";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

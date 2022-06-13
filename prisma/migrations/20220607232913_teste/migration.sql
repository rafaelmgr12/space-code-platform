-- CreateTable
CREATE TABLE "pilots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilot_certification" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "credits" REAL NOT NULL,
    "location_planet" TEXT NOT NULL,
    "ship_id" INTEGER NOT NULL,
    CONSTRAINT "pilots_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ships" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fuel_capacity" REAL NOT NULL,
    "fuel_level" REAL NOT NULL,
    "weight_capacity" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "origin_planet" TEXT NOT NULL,
    "destination_planet" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "resource_id" TEXT NOT NULL,
    "pilot_id" INTEGER NOT NULL,
    CONSTRAINT "contracts_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contracts_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL
);

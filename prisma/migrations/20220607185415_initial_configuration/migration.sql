-- CreateTable
CREATE TABLE "pilots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pilot_certification" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "credits" REAL NOT NULL,
    "location_planet" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "value" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL
);

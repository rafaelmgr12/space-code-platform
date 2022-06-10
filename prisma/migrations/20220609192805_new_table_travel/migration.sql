-- CreateTable
CREATE TABLE "travels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin_planet" TEXT NOT NULL,
    "destination_planet" TEXT NOT NULL,
    "fuel_consumption" REAL NOT NULL,
    "route" BOOLEAN NOT NULL
);

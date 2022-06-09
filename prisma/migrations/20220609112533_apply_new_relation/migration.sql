/*
  Warnings:

  - A unique constraint covering the columns `[pilot_certification]` on the table `pilots` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fuel_capacity" REAL NOT NULL,
    "fuel_level" REAL NOT NULL,
    "weight_capacity" REAL NOT NULL,
    "pilot_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ships_pilot_id_fkey" FOREIGN KEY ("pilot_id") REFERENCES "pilots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ships" ("created_at", "fuel_capacity", "fuel_level", "id", "pilot_id", "weight_capacity") SELECT "created_at", "fuel_capacity", "fuel_level", "id", "pilot_id", "weight_capacity" FROM "ships";
DROP TABLE "ships";
ALTER TABLE "new_ships" RENAME TO "ships";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "pilots_pilot_certification_key" ON "pilots"("pilot_certification");

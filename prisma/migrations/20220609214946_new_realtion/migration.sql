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
CREATE UNIQUE INDEX "ships_pilot_id_key" ON "ships"("pilot_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

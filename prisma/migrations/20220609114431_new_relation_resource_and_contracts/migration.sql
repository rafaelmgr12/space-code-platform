-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "contracts_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resources_contracts_id_fkey" FOREIGN KEY ("contracts_id") REFERENCES "contracts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_resources" ("contracts_id", "created_at", "id", "name", "weight") SELECT "contracts_id", "created_at", "id", "name", "weight" FROM "resources";
DROP TABLE "resources";
ALTER TABLE "new_resources" RENAME TO "resources";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

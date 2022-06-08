/*
  Warnings:

  - A unique constraint covering the columns `[ship_id]` on the table `pilots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pilots_ship_id_key" ON "pilots"("ship_id");

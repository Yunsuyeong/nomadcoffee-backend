/*
  Warnings:

  - A unique constraint covering the columns `[photoId]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coffeeshopId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_photoId_key" ON "CoffeeShop"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_coffeeshopId_key" ON "User"("coffeeshopId");

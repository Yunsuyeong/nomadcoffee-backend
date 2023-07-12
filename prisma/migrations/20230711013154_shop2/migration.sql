/*
  Warnings:

  - A unique constraint covering the columns `[photoId]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coffeeshopId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coffeeshopId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coffeeshopId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_photoId_key" ON "CoffeeShop"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_coffeeshopId_key" ON "User"("coffeeshopId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coffeeshopId_fkey" FOREIGN KEY ("coffeeshopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

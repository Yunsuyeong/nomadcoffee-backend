/*
  Warnings:

  - You are about to drop the column `coffeeshopId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.
  - Made the column `latitude` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_coffeeshopId_fkey";

-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_categoryId_fkey";

-- DropIndex
DROP INDEX "User_avatarURL_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "coffeeshopId";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId",
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CategoryToCoffeeShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoffeeShop_AB_unique" ON "_CategoryToCoffeeShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoffeeShop_B_index" ON "_CategoryToCoffeeShop"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD CONSTRAINT "_CategoryToCoffeeShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD CONSTRAINT "_CategoryToCoffeeShop_B_fkey" FOREIGN KEY ("B") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

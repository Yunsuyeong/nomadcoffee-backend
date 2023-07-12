/*
  Warnings:

  - You are about to drop the column `photoId` on the `CoffeeShop` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeshopId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_photoId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coffeeshopId_fkey";

-- DropIndex
DROP INDEX "CoffeeShop_photoId_key";

-- DropIndex
DROP INDEX "User_coffeeshopId_key";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "photoId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "coffeeshopId";

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD CONSTRAINT "CoffeeShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

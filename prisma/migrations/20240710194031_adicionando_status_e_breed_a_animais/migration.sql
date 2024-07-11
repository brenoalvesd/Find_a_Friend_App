/*
  Warnings:

  - Added the required column `breed` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Avaliable';

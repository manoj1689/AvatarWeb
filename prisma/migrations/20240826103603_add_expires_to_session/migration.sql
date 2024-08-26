/*
  Warnings:

  - Added the required column `expires` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "expires_at" INTEGER;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;

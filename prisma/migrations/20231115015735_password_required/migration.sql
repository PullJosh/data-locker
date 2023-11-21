/*
  Warnings:

  - Made the column `password` on table `JSONDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JSONDocument" ALTER COLUMN "password" SET NOT NULL;

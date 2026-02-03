/*
  Warnings:

  - Made the column `nome` on table `cargo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cargo" ALTER COLUMN "nome" SET NOT NULL;

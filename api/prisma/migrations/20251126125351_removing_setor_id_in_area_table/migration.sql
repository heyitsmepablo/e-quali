/*
  Warnings:

  - You are about to drop the column `setor_id` on the `area` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_setor_id_fkey";

-- AlterTable
ALTER TABLE "area" DROP COLUMN "setor_id";

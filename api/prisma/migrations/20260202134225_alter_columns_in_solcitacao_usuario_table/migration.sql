/*
  Warnings:

  - You are about to drop the column `perfilFuncionalId` on the `solicitacao_usuario` table. All the data in the column will be lost.
  - Added the required column `cargoId` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "solicitacao_usuario" DROP CONSTRAINT "solicitacao_usuario_perfilFuncionalId_fkey";

-- AlterTable
ALTER TABLE "solicitacao_usuario" DROP COLUMN "perfilFuncionalId",
ADD COLUMN     "areaId" INTEGER,
ADD COLUMN     "cargoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `nome` on the `solicitacao_usuario` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricula` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioSolicitadoNome` to the `solicitacao_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solicitacao_usuario" DROP COLUMN "nome",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "matricula" TEXT NOT NULL,
ADD COLUMN     "telefone" INTEGER NOT NULL,
ADD COLUMN     "usuarioSolicitadoNome" TEXT NOT NULL;

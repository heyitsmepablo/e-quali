/*
  Warnings:

  - A unique constraint covering the columns `[origemSolicitacaoId]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusSolicitacaoUsuario" AS ENUM ('APROVADO', 'PENDENTE', 'REJEITADO');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "criadoPorId" UUID,
ADD COLUMN     "origemSolicitacaoId" INTEGER;

-- CreateTable
CREATE TABLE "solicitacao_usuario" (
    "id" SERIAL NOT NULL,
    "usuarioSolicitanteId" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "perfilFuncionalId" INTEGER NOT NULL,
    "detalhe" TEXT NOT NULL,
    "statusSolicitacao" "StatusSolicitacaoUsuario" NOT NULL,
    "usuarioFinalId" UUID,
    "feedbackResultado" TEXT,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "solicitacao_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_solicitacao_usuario" (
    "id" SERIAL NOT NULL,
    "solcitacaoId" INTEGER NOT NULL,
    "autorId" UUID NOT NULL,
    "evento" TEXT NOT NULL,
    "observacao" TEXT,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "historico_solicitacao_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_usuario_usuarioFinalId_key" ON "solicitacao_usuario"("usuarioFinalId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_origemSolicitacaoId_key" ON "usuario"("origemSolicitacaoId");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_origemSolicitacaoId_fkey" FOREIGN KEY ("origemSolicitacaoId") REFERENCES "solicitacao_usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_usuarioSolicitanteId_fkey" FOREIGN KEY ("usuarioSolicitanteId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_usuario" ADD CONSTRAINT "solicitacao_usuario_perfilFuncionalId_fkey" FOREIGN KEY ("perfilFuncionalId") REFERENCES "perfil_funcional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_solicitacao_usuario" ADD CONSTRAINT "historico_solicitacao_usuario_solcitacaoId_fkey" FOREIGN KEY ("solcitacaoId") REFERENCES "solicitacao_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "CategoriaEventoUsuarioSolicitacao" AS ENUM ('SUCESSO', 'INFO', 'ALERTA', 'SISTEMA');

-- AlterTable
ALTER TABLE "historico_solicitacao_usuario" ADD COLUMN     "categoria" "CategoriaEventoUsuarioSolicitacao" NOT NULL DEFAULT 'INFO';

-- AddForeignKey
ALTER TABLE "historico_solicitacao_usuario" ADD CONSTRAINT "historico_solicitacao_usuario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

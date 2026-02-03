/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `solicitacao_usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `solicitacao_usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `solicitacao_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_usuario_cpf_key" ON "solicitacao_usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_usuario_email_key" ON "solicitacao_usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_usuario_matricula_key" ON "solicitacao_usuario"("matricula");

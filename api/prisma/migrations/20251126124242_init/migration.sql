-- CreateEnum
CREATE TYPE "tipo_servico" AS ENUM ('URGENCIA_EMERGENCIA', 'ATENCAO_PRIMARIA', 'AMBULATORIO', 'HOSPITALAR', 'LABORATORIO');

-- CreateTable
CREATE TABLE "unidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "endereco" TEXT,
    "cnes" TEXT,
    "cnpj" TEXT,
    "email_principal" TEXT,
    "email_alternativo" TEXT,
    "unidade_tipo_id" INTEGER,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_hospitalar" (
    "unidade_id" INTEGER NOT NULL,
    "numero_leitos_uti" INTEGER,
    "numero_leitos_uci" INTEGER,
    "numero_leitos_enfermaria" INTEGER,
    "numero_leitos_suporte_ventilatorio_pulmonar" INTEGER,
    "numero_leitos_existente_total" INTEGER,
    "numero_leitos_cnes_total" INTEGER,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "unidade_hospitalar_pkey" PRIMARY KEY ("unidade_id")
);

-- CreateTable
CREATE TABLE "unidade_tipo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "unidade_tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "unidade_setor_area_cargo_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acesso" (
    "id" SERIAL NOT NULL,
    "usuario_id" UUID NOT NULL,
    "senha" TEXT NOT NULL,
    "ultimo_login" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_de_acesso" (
    "id" SERIAL NOT NULL,
    "acesso_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "valido_ate" TIMESTAMP(3) NOT NULL,
    "expirado_em" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "token_de_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "setor_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_setor_area_cargo" (
    "id" SERIAL NOT NULL,
    "unidade_id" INTEGER NOT NULL,
    "setor_id" INTEGER NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "area_id" INTEGER,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "unidade_setor_area_cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_rbac" (
    "id" SERIAL NOT NULL,
    "unidade_setor_area_cargo_id" INTEGER,
    "modulo_id" INTEGER,
    "visualizar" BOOLEAN,
    "criar" BOOLEAN,
    "editar" BOOLEAN,
    "deletar" BOOLEAN,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "controle_rbac_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unidade_tipo_nome_key" ON "unidade_tipo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "acesso_usuario_id_key" ON "acesso"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_de_acesso_token_key" ON "token_de_acesso"("token");

-- CreateIndex
CREATE UNIQUE INDEX "controle_rbac_unidade_setor_area_cargo_id_modulo_id_key" ON "controle_rbac"("unidade_setor_area_cargo_id", "modulo_id");

-- AddForeignKey
ALTER TABLE "unidade" ADD CONSTRAINT "unidade_unidade_tipo_id_fkey" FOREIGN KEY ("unidade_tipo_id") REFERENCES "unidade_tipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_hospitalar" ADD CONSTRAINT "unidade_hospitalar_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_unidade_setor_area_cargo_id_fkey" FOREIGN KEY ("unidade_setor_area_cargo_id") REFERENCES "unidade_setor_area_cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acesso" ADD CONSTRAINT "acesso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_de_acesso" ADD CONSTRAINT "token_de_acesso_acesso_id_fkey" FOREIGN KEY ("acesso_id") REFERENCES "acesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_setor_area_cargo" ADD CONSTRAINT "unidade_setor_area_cargo_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_setor_area_cargo" ADD CONSTRAINT "unidade_setor_area_cargo_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_setor_area_cargo" ADD CONSTRAINT "unidade_setor_area_cargo_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_setor_area_cargo" ADD CONSTRAINT "unidade_setor_area_cargo_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_rbac" ADD CONSTRAINT "controle_rbac_unidade_setor_area_cargo_id_fkey" FOREIGN KEY ("unidade_setor_area_cargo_id") REFERENCES "unidade_setor_area_cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_rbac" ADD CONSTRAINT "controle_rbac_modulo_id_fkey" FOREIGN KEY ("modulo_id") REFERENCES "modulo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

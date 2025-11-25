# e-Quali 🏥
Sistema de Gestão da Qualidade da Secretaria Municipal de Saúde (SEMUS).

## 📄 Sobre o Projeto
O e-Quali é uma solução Web desenvolvida para centralizar o monitoramento de indicadores de desempenho das unidades de saúde, gerenciar o acesso de usuários de forma hierárquica e prover um repositório seguro de documentação institucional.
O sistema visa substituir controles manuais e descentralizados, oferecendo uma visão estratégica, tática e operacional para a SEMUS, garantindo a segurança dos dados e a facilidade de uso para gestores.

## 🚀 Tecnologias Utilizadas
O projeto segue uma abordagem Design First e utiliza uma arquitetura moderna e escalável:
Frontend
Angular (Framework SPA)
Tailwind CSS (Estilização e Responsividade)
Backend
NestJS (Framework Node.js)
Prisma ORM (Camada de Dados)
PostgreSQL (Banco de Dados Relacional)
Infraestrutura & DevOps
Docker (Containerização)

## 🎯 Módulos Principais (MVP)
1. 🔐 Gestão de Identidade e Acesso
- Autenticação Robusta: Login seguro com criptografia de ponta.
- Auto-cadastro: Fluxo de self-registration para servidores, com aprovação administrativa posterior.
- Hierarquia: Controle estrito de visibilidade (Administrador, Superintendente, Gestor de Unidade, Secretaria).
- Segurança: Troca obrigatória de senha no primeiro acesso e logoff automático por inatividade.
2. 📊 Gestão de Indicadores
- Criação Dinâmica: Definição de métricas Estratégicas, Táticas e Operacionais.
- Distribuição: Superintendentes podem criar indicadores e distribuí-los automaticamente para preenchimento nas Unidades vinculadas.
- Alimentação: Interface intuitiva para input de dados "Realizado vs Meta".
3. 📈 Dashboards e Visualização
- Gráficos Interativos: Visualização de evolução temporal (linhas) e comparativos (barras).
- Drill-down: Navegação detalhada (Secretaria → Superintendência → Unidade).
- Responsividade: Versão mobile otimizada para visualização rápida de indicadores.
4. 🗄️ Repositório Institucional
- Centralização de Manuais, POPs e Regimentos.
- Upload e Download seguro de arquivos (PDF, DOCX, XLSX).
## 👥 **Perfis de Usuário**

| Perfil             | Responsabilidades |
|-------------------|-------------------|
| **Administrador** | Gestão técnica, aprovação de cadastros, controle de acesso e repositório. |
| **Secretaria** | Acesso à visão gerencial e dashboards consolidados. |
| **Superintendente** | Gestão de unidades, criação de indicadores e acompanhamento de metas. |
| **Gestor de Unidade** | Preenchimento de dados operacionais e acompanhamento local. |

## ⚙️ Pré-requisitos e Instalação
Para rodar o projeto localmente, você precisará ter instalado:
Node.js (LTS)
Docker & Docker Compose
Passo a Passo
Clone o repositório
```bash
git clone [https://github.com/seu-usuario/e-Quali.git](https://github.com/seu-usuario/e-Quali.git)
cd e-Quali
```

Suba os containers (Banco de Dados)
```bash
docker-compose up -d
```


Backend (API)
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```


Frontend (Web)
```bash
cd frontend
npm install
ng serve
```

Acesso
- Frontend: http://localhost:4200
- API Swagger: http://localhost:3000/api


## 🛣️ Roadmap de Desenvolvimento
O projeto segue um cronograma ágil dividido em Sprints:
[ ] Sprint 1: Fundação, Segurança Básica e Docker.
[ ] Sprint 2: Governança de Usuários (Auto-cadastro e Aprovação).
[ ] Sprint 3: Núcleo de Indicadores (Modelagem e Distribuição).
[ ] Sprint 4: Alimentação de Dados e Validações.
[ ] Sprint 5: Dashboards Consolidados e Repositório de Arquivos.
[ ] Sprint 6: Refinamento (Mobile, UX, Recuperação de Senha).
[ ] Sprint 7: Auditoria e Entrega Final.

## 📝 Autoria e Referência
### Desenvolvimento: 
- Pablo Eduardo Silva Santos (Engenheiro de Software Pleno / Líder Técnico) - 25/11/2025.

### Baseado em:
- Documento de Requisitos de Software (DRS) v1.0
- Plano de Projeto Ágil - SEMUS


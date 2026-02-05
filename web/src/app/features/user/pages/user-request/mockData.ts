export const mockDataUsers = [
  {
    id: 1,
    usuarioSolicitadoNome: 'Ana Clara Souza',
    unidade: {
      id: 101,
      nome: 'Matriz São Paulo',
      sigla: 'MAT-SP',
    },
    setor: {
      id: 201,
      nome: 'Tecnologia da Informação',
      sigla: 'TI',
    },
    area: {
      id: 301,
      nome: 'Desenvolvimento Backend',
    },
    cargo: {
      id: 401,
      nome: 'Engenheira de Software Pleno',
    },
    statusSolicitacao: 'aprovado',
    criadoEm: '2026-02-01T08:30:00.000Z',
    atualizadoEm: '2026-02-02T10:15:00.000Z',
  },
  {
    id: 2,
    usuarioSolicitadoNome: 'Carlos Eduardo Lima',
    unidade: {
      id: 102,
      nome: 'Filial Rio de Janeiro',
      sigla: 'FIL-RJ',
    },
    setor: {
      id: 202,
      nome: 'Recursos Humanos',
      sigla: 'RH',
    },
    area: {
      id: 302,
      nome: 'Recrutamento e Seleção',
    },
    cargo: {
      id: 402,
      nome: 'Analista de RH Júnior',
    },
    statusSolicitacao: 'pendente',
    criadoEm: '2026-02-04T14:20:00.000Z',
    atualizadoEm: '2026-02-04T14:20:00.000Z',
  },
  {
    id: 3,
    usuarioSolicitadoNome: 'Mariana Oliveira',
    unidade: {
      id: 101,
      nome: 'Matriz São Paulo',
      sigla: 'MAT-SP',
    },
    setor: {
      id: 203,
      nome: 'Financeiro',
      sigla: 'FIN',
    },
    area: {
      id: 303,
      nome: 'Contas a Pagar',
    },
    cargo: {
      id: 403,
      nome: 'Coordenadora Financeira',
    },
    statusSolicitacao: 'rejeitado',
    criadoEm: '2026-01-20T09:00:00.000Z',
    atualizadoEm: '2026-01-21T16:45:00.000Z',
  },
  {
    id: 4,
    usuarioSolicitadoNome: 'Roberto Mendes',
    unidade: {
      id: 103,
      nome: 'Centro de Distribuição Sul',
      sigla: 'CD-SUL',
    },
    setor: {
      id: 204,
      nome: 'Logística',
      sigla: 'LOG',
    },
    area: {
      id: 304,
      nome: 'Expedição',
    },
    cargo: {
      id: 404,
      nome: 'Supervisor de Logística',
    },
    statusSolicitacao: 'aprovado',
    criadoEm: '2026-02-03T11:10:00.000Z',
    atualizadoEm: '2026-02-05T09:00:00.000Z',
  },
  {
    id: 5,
    usuarioSolicitadoNome: 'Fernanda Torres',
    unidade: {
      id: 101,
      nome: 'Matriz São Paulo',
      sigla: 'MAT-SP',
    },
    setor: {
      id: 205,
      nome: 'Marketing',
      sigla: 'MKT',
    },
    area: {
      id: 305,
      nome: 'Branding',
    },
    cargo: {
      id: 405,
      nome: 'Designer Gráfico',
    },
    statusSolicitacao: 'pendente',
    criadoEm: '2026-02-05T08:00:00.000Z',
    atualizadoEm: '2026-02-05T08:00:00.000Z',
  },
];

export interface SelectOption {
  label: string;
  value: number | string;
}

// 1. Mocks para as Listas (Dropdowns/Selects)
export const mockUnidades: SelectOption[] = [
  { label: 'Hospital Municipal Djalma Marques (Socorrão I)', value: 1 },
  { label: 'Hospital Municipal Dr. Clementino Moura (Socorrão II)', value: 2 },
  { label: 'UPA - Zona Norte', value: 3 },
  { label: 'Secretaria Municipal de Saúde (SEMUS)', value: 4 },
];

export const mockSetores: SelectOption[] = [
  { label: 'Tecnologia da Informação', value: 1 },
  { label: 'Recursos Humanos', value: 2 },
  { label: 'Ambulatório', value: 3 },
  { label: 'Urgência e Emergência', value: 4 },
];

export const mockAreas: SelectOption[] = [
  { label: 'Não Aplica', value: 0 },
  { label: 'Administrativo', value: 1 },
  { label: 'Assistencial', value: 2 },
  { label: 'Apoio Diagnóstico', value: 3 },
];

export const mockCargos: SelectOption[] = [
  { label: 'Analista de Sistemas', value: 1 },
  { label: 'Médico Plantonista', value: 2 },
  { label: 'Enfermeiro Chefe', value: 3 },
  { label: 'Técnico Administrativo', value: 4 },
];

// 2. Mock para preencher o formulário (Simulação de Edição)
// Note: As chaves devem bater exatamente com o formControlName do FormBuilder
export const mockRequestToEdit = {
  id: 1,
  nome: 'Guilherme Jaquison',
  matricula: '202498765',
  // Importante: Para inputs type="date", o formato deve ser YYYY-MM-DD
  dataNascimento: '1995-05-20',
  cpf: '123.456.789-00',
  email: 'guilherme.jaquison@semus.ma.gov.br',
  telefone: '(98) 98888-1234',
  unidadeId: 4, // ID correspondente à SEMUS na lista acima
  setorId: 1, // ID correspondente à TI
  areaId: 1, // ID correspondente ao Administrativo
  cargoId: 1, // ID correspondente ao Analista
  detalhes: 'Solicito acesso ao módulo de gestão de leitos para integração com o sistema atual.',
};

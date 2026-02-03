import { User } from './user-request';

export const mockDataUsers: User[] = [
  {
    id: '1',
    name: 'Adam Trantow',
    company: 'Mohr, Langworth and Hills',
    role: 'UI Designer',
    verified: true,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Adam+Trantow&background=c7d2fe&color=3730a3',
  },
  {
    id: '2',
    name: 'Angel Rololfson',
    company: 'Koch and Sons',
    role: 'Full Stack Designer',
    verified: true,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Angel+Rololfson&background=fecaca&color=991b1b',
  },
  {
    id: '3',
    name: 'Betty Hammes',
    company: 'Waelchi - VonRueden',
    role: 'Hr Manager',
    verified: false,
    status: 'Banned',
    avatarUrl: 'https://ui-avatars.com/api/?name=Betty+Hammes&background=bbf7d0&color=166534',
  },
  {
    id: '4',
    name: 'Billy Braun',
    company: 'White, Cassin and Goldner',
    role: 'Leader',
    verified: true,
    status: 'Banned',
    avatarUrl: 'https://ui-avatars.com/api/?name=Billy+Braun&background=bfdbfe&color=1e3a8a',
  },
  {
    id: '5',
    name: 'Billy Stoltenberg',
    company: 'Medhurst, Moore and Franey',
    role: 'Leader',
    verified: true,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Billy+Stoltenberg&background=e9d5ff&color=6b21a8',
  },
  {
    id: '6',
    name: 'Charles Franecki',
    company: 'Langosh, Kautzer and Kraus',
    role: 'Full Stack Designer',
    verified: false,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Charles+Franecki&background=fde68a&color=92400e',
  },
  {
    id: '7',
    name: 'Christopher Bernier',
    company: 'Johnston, Kirlin and Wolk',
    role: 'Backend Developer',
    verified: true,
    status: 'Banned',
    avatarUrl:
      'https://ui-avatars.com/api/?name=Christopher+Bernier&background=a5f3fc&color=155e75',
  },
  {
    id: '8',
    name: 'Clark Mueller',
    company: 'Wiza, Schowalter and Conroy',
    role: 'Front End Developer',
    verified: false,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Clark+Mueller&background=ddd6fe&color=5b21b6',
  },
  {
    id: '9',
    name: 'Danny Armstrong',
    company: "Toy, Borer and O'Kon",
    role: 'Project Manager',
    verified: true,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=Danny+Armstrong&background=fbcfe8&color=9d174d',
  },
  {
    id: '10',
    name: 'David Becker',
    company: 'Yost and Sons',
    role: 'UI/UX Designer',
    verified: true,
    status: 'Active',
    avatarUrl: 'https://ui-avatars.com/api/?name=David+Becker&background=e2e8f0&color=475569',
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

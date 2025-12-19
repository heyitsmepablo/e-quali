export type UserPayloadStorage = {
  cpf: string;
  id: string;
  matricula: string;
  nome: string;
  email: string;
  perfilFuncional: {
    area: {
      id: number;
      nome: string;
    };
    cargo: {
      id: number;
      nome: string;
    };
    setor: {
      id: number;
      nome: string;
      sigla: string;
    };
    unidade: {
      id: number;
      nome: string;
      sigla: string;
    };
  };
};

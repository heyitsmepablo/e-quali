export class LoginAuthDto {
  cpf: string;
  senha: string;
}

export class LoginAuthResponseDto {
  token: string;
  tipo: string;
  expira_em_milisegundos: number;
  valido_ate_timestamp: number;
  usuario: {
    cpf: string;
    id: string;
    matricula: string;
    nome: string;
    email: string | null;
    perfilFuncional: {
      area: {
        id: number;
        nome: string;
      } | null;
      cargo: {
        id: number;
        nome: string | null;
      };
      setor: {
        id: number;
        nome: string;
        sigla: string | null;
      };
      unidade: {
        id: number;
        nome: string;
        sigla: string | null;
      };
    };
  };
  ultimo_login: Date | null;
}

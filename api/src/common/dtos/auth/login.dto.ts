export class LoginAuthDto {
  cpf: string;
  senha: string;
}

export class LoginAuthResponseDto {
  user: {
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
    ultimoLogin: Date | null;
  };
}

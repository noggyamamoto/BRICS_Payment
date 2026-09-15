export interface Cliente {
  id?: number;
  cpf: string;
  nome: string;
  dataNascimento: string; // ISO yyyy-MM-dd
  cep: string;
  email: string;
  senha: string;
}
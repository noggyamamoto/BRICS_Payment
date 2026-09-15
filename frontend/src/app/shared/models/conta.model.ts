export interface Conta {
  id: number;
  numero: string;
  agencia: string;
  saldo: number;
  tipo: 'CORRENTE' | 'POUPANCA' | 'SALARIO';
}
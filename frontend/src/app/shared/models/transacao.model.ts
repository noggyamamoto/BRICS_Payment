export interface Transacao {
  id: number;
  tipo: 'DEPOSITO' | 'SAQUE' | 'TRANSFERENCIA' | 'INVESTIMENTO' | 'RESGATE';
  valor: number;
  data: string;
  descricao?: string;
}
export interface Investimento {
  id: number;
  contaId: number;
  produtoId: number;
  valorAplicado: number;
  dataAplicacao: string;
  status: 'ATIVO' | 'RESGATADO';
}
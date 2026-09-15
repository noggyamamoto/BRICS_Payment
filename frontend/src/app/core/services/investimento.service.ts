import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Investimento } from '../../shared/models/investimento.model';
import { ProdutoInvestimento } from '../../shared/models/produto-investimento.model';

/**
 * Serviço de investimentos.
 * Rotas do backend:
 *   GET  /api/v1/investimentos/produtos       → Lista produtos disponíveis
 *   POST /api/v1/investimentos                → Comprar
 *   GET  /api/v1/investimentos/conta/{id}     → Lista por conta
 */
@Injectable({ providedIn: 'root' })
export class InvestimentoService {
  private readonly url = `${environment.apiUrl}/investimentos`;

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<ProdutoInvestimento[]> {
    return this.http.get<ProdutoInvestimento[]>(`${this.url}/produtos`);
  }

  listarPorConta(contaId: number): Observable<Investimento[]> {
    return this.http.get<Investimento[]>(`${this.url}/conta/${contaId}`);
  }

  comprar(contaId: number, produtoId: number, valorAplicado: number): Observable<Investimento> {
    return this.http.post<Investimento>(this.url, { contaId, produtoId, valorAplicado });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Conta } from '../../shared/models/conta.model';
import { Transacao } from '../../shared/models/transacao.model';

/**
 * Serviço de conta corrente.
 * Rotas do backend:
 *   GET  /api/v1/contas/{id}                 → Buscar conta
 *   POST /api/v1/contas/{id}/deposito        → Depositar
 *   POST /api/v1/contas/{id}/saque           → Sacar
 *   GET  /api/v1/contas/{id}/extrato         → Extrato (opcional ?inicio=&fim=)
 */
@Injectable({ providedIn: 'root' })
export class ContaService {
  private readonly url = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) {}

  buscarConta(contaId: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.url}/${contaId}`);
  }

  depositar(contaId: number, valor: number): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.url}/${contaId}/deposito`, { valor });
  }

  sacar(contaId: number, valor: number): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.url}/${contaId}/saque`, { valor });
  }

  extrato(contaId: number, inicio?: string, fim?: string): Observable<Transacao[]> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio);
    if (fim)    params = params.set('fim', fim);
    return this.http.get<Transacao[]>(`${this.url}/${contaId}/extrato`, { params });
  }
}
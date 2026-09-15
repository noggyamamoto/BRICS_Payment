import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from '../../shared/models/cliente.model';

/**
 * Serviço de clientes.
 * Rotas do backend:
 *   POST /api/v1/clientes        → Cadastrar
 *   GET  /api/v1/clientes/{id}   → Buscar por ID
 */
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly url = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }
}
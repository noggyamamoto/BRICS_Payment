import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

/**
 * Serviço de autenticação.
 * Rotas do backend:
 *   POST /api/v1/auth/login   → LoginRequestDTO  → { token, clienteId, nome, email }
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /** Realiza login e armazena token + dados do usuário. */
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { email, senha });
  }

  /** Encerra sessão local. */
  logout(): void {
    this.tokenService.removeToken();
  }
}
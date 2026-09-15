import { Injectable } from '@angular/core';

/**
 * Responsável por gerenciar o JWT e os dados do usuário no localStorage.
 * Centraliza acesso para facilitar trocar para sessionStorage/IndexedDB.
 */
@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'brics_token';
  private readonly USER_KEY  = 'brics_user';

  /** Salva o token JWT. */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /** Recupera o token JWT (ou null). */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Remove o token (logout). */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /** Salva dados básicos do usuário logado. */
  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /** Recupera dados do usuário logado. */
  getUser(): any | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  /** Indica se há token armazenado. */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

/**
 * Tela de login.
 * POST /api/v1/auth/login  { email, senha }  → { token, clienteId, nome, email }
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  carregando = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /** Submete o formulário de login. */
  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.carregando = true;
    this.erro = '';

    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).subscribe({
      next: (res) => {
        // Armazena token e dados do usuário
        this.tokenService.setToken(res.token);
        this.tokenService.setUser({ id: res.clienteId, nome: res.nome, email: res.email });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.erro = err?.error?.erro || 'E-mail ou senha inválidos';
        this.carregando = false;
      }
    });
  }
}
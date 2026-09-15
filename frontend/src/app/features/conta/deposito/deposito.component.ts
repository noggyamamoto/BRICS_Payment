import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../../../core/services/conta.service';
import { TokenService } from '../../../core/services/token.service';

/**
 * Tela de depósito.
 * POST /api/v1/contas/{contaId}/deposito  { valor }
 */
@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {
  form: FormGroup;
  carregando = false;
  mensagem = '';
  erro = '';

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.form = this.fb.group({
      valor: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.carregando = true;
    this.erro = '';

    const contaId = this.tokenService.getUser()?.contaId || 1;

    this.contaService.depositar(contaId, this.form.value.valor).subscribe({
      next: () => {
        this.mensagem = 'Depósito realizado com sucesso!';
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      },
      error: (err) => {
        this.erro = err?.error?.erro || 'Erro ao realizar depósito';
        this.carregando = false;
      }
    });
  }
}
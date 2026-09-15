import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../../../core/services/conta.service';
import { TokenService } from '../../../core/services/token.service';

/**
 * Tela de saque.
 * POST /api/v1/contas/{contaId}/saque  { valor }
 * Regra: valor <= saldo. Backend retorna 400 se insuficiente.
 */
@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent {
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

    this.contaService.sacar(contaId, this.form.value.valor).subscribe({
      next: () => {
        this.mensagem = 'Saque realizado com sucesso!';
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      },
      error: (err) => {
        // Trata "Saldo insuficiente" etc.
        this.erro = err?.error?.erro || 'Erro ao realizar saque';
        this.carregando = false;
      }
    });
  }
}
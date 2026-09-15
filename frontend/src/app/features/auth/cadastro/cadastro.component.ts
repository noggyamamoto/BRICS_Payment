import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';

/**
 * Tela de cadastro de novo cliente.
 * POST /api/v1/clientes → { cpf, nome, dataNascimento, cep, email, senha }
 */
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  carregando = false;
  erro = '';
  sucesso = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }
    this.carregando = true;
    this.erro = '';

    this.clienteService.cadastrar(this.cadastroForm.value).subscribe({
      next: () => {
        this.sucesso = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        // Mensagens do GlobalExceptionHandler
        this.erro = err?.error?.erro
          || (err?.error?.cpf && 'CPF inválido')
          || 'Erro ao cadastrar. Verifique os dados.';
        this.carregando = false;
      }
    });
  }
}
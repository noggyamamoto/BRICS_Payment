import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContaService } from '../../../core/services/conta.service';
import { TokenService } from '../../../core/services/token.service';
import { Transacao } from '../../../shared/models/transacao.model';

/**
 * Tela de extrato com filtros por data.
 * GET /api/v1/contas/{id}/extrato?inicio=&fim=
 */
@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {
  form: FormGroup;
  transacoes: Transacao[] = [];
  carregando = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private tokenService: TokenService
  ) {
    this.form = this.fb.group({
      inicio: [''],
      fim: ['']
    });
  }

  ngOnInit(): void {
    this.buscar();
  }

  /** Busca o extrato (com filtros opcionais). */
  buscar(): void {
    const contaId = this.tokenService.getUser()?.contaId || 1;
    const { inicio, fim } = this.form.value;

    this.carregando = true;
    this.erro = '';

    this.contaService.extrato(contaId, inicio || undefined, fim || undefined).subscribe({
      next: (t) => { this.transacoes = t; this.carregando = false; },
      error: (err) => {
        this.erro = err?.error?.erro || 'Erro ao carregar extrato';
        this.carregando = false;
      }
    });
  }

  /** Formata valor em BRL. */
  formatBRL(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  /** Formata data/hora. */
  formatDate(d: string): string {
    return new Date(d).toLocaleString('pt-BR');
  }
}
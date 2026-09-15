import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContaService } from '../../core/services/conta.service';
import { InvestimentoService } from '../../core/services/investimento.service';
import { TokenService } from '../../core/services/token.service';
import { Conta } from '../../shared/models/conta.model';
import { Transacao } from '../../shared/models/transacao.model';
import { Investimento } from '../../shared/models/investimento.model';

/**
 * Dashboard principal: exibe saldo, últimas transações e atalhos.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  conta?: Conta;
  ultimasTransacoes: Transacao[] = [];
  investimentos: Investimento[] = [];
  carregando = true;
  erro = '';

  constructor(
    private contaService: ContaService,
    private investimentoService: InvestimentoService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Recupera o ID da conta do usuário logado (armazenado no localStorage)
    const user = this.tokenService.getUser();
    const contaId = user?.contaId || 1; // fallback

    this.contaService.buscarConta(contaId).subscribe({
      next: (c) => {
        this.conta = c;
        this.contaService.extrato(contaId).subscribe({
          next: (t) => { this.ultimasTransacoes = t.slice(0, 5); },
          error: () => {}
        });
        this.investimentoService.listarPorConta(contaId).subscribe({
          next: (i) => { this.investimentos = i; this.carregando = false; },
          error: () => { this.carregando = false; }
        });
      },
      error: (err) => {
        this.erro = 'Não foi possível carregar os dados da conta.';
        this.carregando = false;
      }
    });
  }

  /** Navega para uma rota específica. */
  ir(rota: string): void { this.router.navigate([rota]); }

  /** Formata valor em Reais. */
  formatBRL(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  /** Formata data. */
  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('pt-BR');
  }
}
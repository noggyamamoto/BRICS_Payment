import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestimentoService } from '../../../core/services/investimento.service';
import { ProdutoInvestimento } from '../../../shared/models/produto-investimento.model';

/**
 * Lista de produtos de investimento disponíveis.
 * GET /api/v1/investimentos/produtos
 */
@Component({
  selector: 'app-investimento-lista',
  templateUrl: './investimento-lista.component.html',
  styleUrls: ['./investimento-lista.component.css']
})
export class InvestimentoListaComponent implements OnInit {
  produtos: ProdutoInvestimento[] = [];
  carregando = true;
  erro = '';

  constructor(private service: InvestimentoService, private router: Router) {}

  ngOnInit(): void {
    this.service.listarProdutos().subscribe({
      next: (p) => { this.produtos = p; this.carregando = false; },
      error: () => { this.erro = 'Erro ao carregar produtos'; this.carregando = false; }
    });
  }

  /** Abre a tela de compra do produto selecionado. */
  comprar(id: number): void {
    this.router.navigate(['/investimentos/comprar', id]);
  }

  formatBRL(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }
}